const { cmd } = require('../command');
const config = require('../config');

cmd({
    pattern: "dev",
    react: "💻",
    desc: "Get developer info",
    category: "main",
    filename: __filename
},
async (conn, mek, m, { from }) => {
    try {
        const developers = config.DEVELOPERS || [
            {
                name: "DevOne",
                number: "+12345678901",
                image: "https://avatars.githubusercontent.com/u/142110420?v=4"
            },
            {
                name: "DevTwo",
                number: "+10987654321",
                image: "https://files.catbox.moe/xyz456.jpg"
            },
            {
                name: "DevThree",
                number: "+11223344556",
                image: "https://files.catbox.moe/def789.jpg"
            }
        ];

        for (const dev of developers) {
            const vcard = `BEGIN:VCARD\n` +
                          `VERSION:3.0\n` +
                          `FN:${dev.name}\n` +
                          `TEL;type=CELL;type=VOICE;waid=${dev.number.replace('+', '')}:${dev.number}\n` +
                          `END:VCARD`;

            // Send vCard contact
            await conn.sendMessage(from, {
                contacts: {
                    displayName: dev.name,
                    contacts: [{ vcard }]
                }
            });

            // Send image + caption
            await conn.sendMessage(from, {
                image: { url: dev.image },
                caption: `╭──〔 *Developer Info* 〕──⭓
┃◈ *Name*: ${dev.name}
┃◈ *Number*: ${dev.number}
┃◈ *Role*: Developer
╰───────────────⭓
> *ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴍᴇɢᴀʟᴏᴅᴏɴ ᴍᴅ*`,
                contextInfo: {
                    mentionedJid: [`${dev.number.replace('+', '')}@s.whatsapp.net`],
                    forwardingScore: 999,
                    isForwarded: true
                }
            }, { quoted: mek });
        }

    } catch (error) {
        console.error(error);
        m.reply(`An error occurred: ${error.message}`);
    }
});
