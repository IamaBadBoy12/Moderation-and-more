const db = require("quick.db");

module.exports = {
  config: {
  name: "delcc",
  aliases: ["d-cmd"],
  usage: "delcmd <cmd_name>",
  description: "Delete the custom commannd",
  category: "admin",
  },
  
  run: async (bot, message, args) => {

    let cmdname = args[0];

    if(!cmdname) return message.channel.send("❌ Give me commmand name, `delcmd <cmd_name>`")

    let database = db.fetch(`cmd_${message.guild.id}`)

    if(database) {
      let data = database.find(x => x.name === cmdname.toLowerCase())

      if(!data) return message.channel.send("❌ Unable to find this command.")

      let value = database.indexOf(data)
      delete database[value]

      var filter = database.filter(x => {
        return x != null && x != ''
      })

      db.set(`cmd_${message.guild.id}`, filter)
      return message.channel.send(`Deleted the **${cmdname}** Command!, why did you want to delete it 🤔`)


    } else {
      return message.channel.send("❌ Sorry but i am unable to find that command!")
    


  }
  }
}
