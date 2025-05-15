const { cmd } = require('../command');

cmd({
    pattern: "dev",
    react: "💻",
    desc: "Get developer info or summary",
    category: "main",
    filename: __filename
},
async (conn, mek, m, { from, body }) => {
    try {
        const developers = [
            {
                name: "DevOne",
                number: "+12345678901",
                image: "https://avatars.githubusercontent.com/u/142110420?v=4",
                role: "Lead Developer"
            },
            {
                name: "DevTwo",
                number: "+10987654321",
                image: "https://files.catbox.moe/xyz456.jpg",
                role: "Backend Developer"
            },
            {
                name: "DevThree",
                number: "+11223344556",
                image: "https://files.catbox.moe/def789.jpg",
                role: "Frontend Developer"
            }
        ];

        const text = body?.toLowerCase()?.trim() || '';

        if (text === '.dev') {
            let listMsg = `👨‍💻 *Megalodon-MD Developer Team*\n\n`;
            developers.forEach((dev, i) => {
                listMsg += `*Dev ${i + 1}*: ${dev.name} - ${dev.role}\n`;
            });
            listMsg += `\nSend *.dev1*, *.dev2*, or *.dev3* for more details.`;

            await m.reply(listMsg);
            return;
        }

        const match = text.match(/^\.dev([1-3])$/);
        if (!match) {
            await m.reply("❌ Invalid command.\nUse `.dev` for a list or `.dev1` to `.dev3` for developer details.");
            return;
        }

        const index = parseInt(match[1]) - 1;
        const dev = developers[index];

        const vcard = `BEGIN:VCARD\nVERSION:3.0\n` +
                      `FN:${dev.name}\n` +
                      `TEL;type=CELL;type=VOICE;waid=${dev.number.replace('+', '')}:${dev.number}\n` +
                      `END:VCARD`;

        // Send contact vCard
        await conn.sendMessage(from, {
            contacts: {
                displayName: dev.name,
                contacts: [{ vcard }]
            }
        });

        // Send developer photo with caption
        await conn.sendMessage(from, {
            image: { url: dev.image },
            caption: `╭──〔 *Developer Info* 〕──⭓
┃◈ *Name*: ${dev.name}
┃◈ *Number*: ${dev.number}
┃◈ *Role*: ${dev.role}
╰───────────────⭓
> *ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴍᴇɢᴀʟᴏᴅᴏɴ ᴍᴅ*`,
            contextInfo: {
                mentionedJid: [`${dev.number.replace('+', '')}@s.whatsapp.net`],
                forwardingScore: 999,
                isForwarded: true
            }
        }, { quoted: mek });

    } catch (error) {
        console.error(error);
        m.reply(`❌ Error: ${error.message}`);
    }
});
