let fs = require('fs')
let handler = async (m, { conn, args }) => {
    //try {
    const json = JSON.parse(fs.readFileSync('./src/moderator.json'))
    let who
    if (m.isGroup) m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted.sender ? m.quoted.sender : args[0].replace(/[^0-9]/g, '') + '@s.whatsapp.net'
    else who = m.quoted.sender ? m.quoted.sender : m.chat ? m.chat : args[0].replace(/[^0-9]/g, '') + '@s.whatsapp.net' //: m.chat
    if (json.includes(who.split`@`[0])) throw `${await conn.getName(who)} sudah moderator!`
    json.push(`${who.split`@`[0]}`)
    fs.writeFileSync('./src/moderator.json', JSON.stringify(json))
    m.reply2(`${await conn.getName(who)} sekarang adalah moderator!`)
    delete require.cache[require.resolve('../config')]
    require('../config')
   // } catch(e) {
     //  throw `@tag atau balas!`
   //    console.log(e)
     //  }
}
handler.help = ['addmods [@user]']
handler.tags = ['owner']
handler.command = /^(add|tambah|\+)mod?s?$/i

handler.rowner = true

module.exports = handler
