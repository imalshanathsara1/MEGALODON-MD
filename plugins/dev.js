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
                name: "MR WASI",
                number: "923192173398",
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

        const input = body.trim().toLowerCase();

        // Match exact pattern like .dev, .dev1, .dev2, .dev3
        if (input === ".dev") {
            // Summary of all devs
            let summary = `👨‍💻 *Megalodon-MD Developer Team*\n\n`;
            developers.forEach((dev, i) => {
                summary += `*Dev ${i + 1}*: ${dev.name} - ${dev.role}\n`;
            });
            summary += `\n_Send *.dev1*, *.dev2*, or *.dev3* to view individual developer details._`;
            return await m.reply(summary);
        }

        // Individual dev commands
        const match = input.match(/^\.dev([1-3])$/);
        if (match) {
            const index = parseInt(match[1], 10) - 1;
            const dev = developers[index];

            const vcard = `BEGIN:VCARD\n` +
                          `VERSION:3.0\n` +
                          `FN:${dev.name}\n` +
                          `TEL;type=CELL;type=VOICE;waid=${dev.number.replace('+', '')}:${dev.number}\n` +
                          `END:VCARD`;

            // Send vCard
            await conn.sendMessage(from, {
                contacts: {
                    displayName: dev.name,
                    contacts: [{ vcard }]
                }
            });

            // Send image with caption
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

        } else {
            // If pattern doesn't match .dev, .dev1-3
            await m.reply("❌ Invalid command.\nUse `.dev` to view the developer list or `.dev1` to `.dev3` for details.");
        }

    } catch (error) {
        console.error(error);
        m.reply(`❌ An error occurred: ${error.message}`);
    }
});
