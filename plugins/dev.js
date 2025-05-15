/** CODED BY MR WASI
*/


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
        const developers = [
            {
                name: "MR WASI",
                number: "+923192173398",
                image: "https://files.catbox.moe/abc123.jpg"
            },
            {
                name: "DEBY TECH",
                number: "+123456789",
                image: "https://files.catbox.moe/xyz456.jpg"
            },
            {
                name: "STEVY TECH",
                number: "+12345678789",
                image: "https://files.catbox.moe/def789.jpg"
            }
        ];

        for (const dev of developers) {
            const vcard = `BEGIN:VCARD\nVERSION:3.0\nFN:${dev.name}\n` +
                          `TEL;type=CELL;type=VOICE;waid=${dev.number.replace('+', '')}:${dev.number}\nEND:VCARD`;

            // Send contact vCard
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
        reply(`An error occurred: ${error.message}`);
    }
});
