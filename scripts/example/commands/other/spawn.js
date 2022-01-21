import { Server } from '../../../library/Minecraft.js';
const registerInformation = {
    cancelMessage: true,
    name: 'spawn',
    description: 'Warps the player to where staff have set world spawn',
    usage: '[ spawn ]',
    example: [
        'spawn'
    ]
};
Server.command.register(registerInformation, (chatmsg, args) => {
    if( Server.player.getScore('icmtoggle', chatmsg.sender.nameTag) === 0) {
        return Server.broadcast(`§¶§cLexus ► §c§lThe Realm Owner currently has Player Commands Disabled`, chatmsg.sender.nameTag);
    } else if( Server.player.getScore('icmtoggle', chatmsg.sender.nameTag) === 1) {
        
        if(args[0])
        {
            Server.broadcast(`§¶§cLexus ► §e§lYou found a Easter Egg! Hello There. Let this be our little secret ;)`, chatmsg.sender.nameTag);
        }
        else {
            let command = `tp "${chatmsg.sender.nameTag}" ${Server.player.getScore('Worldx', chatmsg.sender.nameTag)} ${Server.player.getScore('Worldy', chatmsg.sender.nameTag)} ${Server.player.getScore('Worldz', chatmsg.sender.nameTag)}`
            Server.runCommand( command );
            Server.broadcast(`§¶§cLexus ► §l§d${chatmsg.sender.nameTag} §bHas warped to World Spawn at §6${Server.player.getScore('Worldx', chatmsg.sender.nameTag)} ${Server.player.getScore('Worldy', chatmsg.sender.nameTag)} ${Server.player.getScore('Worldz', chatmsg.sender.nameTag)}`, chatmsg.sender.nameTag);
            Server.broadcastStaff(`§¶§cLexus ► §d${chatmsg.sender.nameTag} §bwarped to worldspawn`);
        }
    }
    else {
        return Server.broadcast(`§¶§cLexus ► §cERROR 2! §6Command Failed`, chatmsg.sender.nameTag);
    }
});
