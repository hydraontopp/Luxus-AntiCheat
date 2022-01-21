import { Server } from '../../../library/Minecraft.js';
const registerInformation = {
    cancelMessage: true,
    name: 'suicide',
    description: 'Configure the World Spawn in Lexus',
    usage: '[ cancel ]',
    example: [
        'suicide',
        'suicide cancel'
    ]
};

Server.command.register(registerInformation, (chatmsg, args) => {
    if( Server.player.getScore('icmtoggle', chatmsg.sender.nameTag) === 0) {
        return Server.broadcast(`§¶§cLexus ► §c§lThe Realm Owner currently has Player Commands Disabled`, chatmsg.sender.nameTag);
    } else if( Server.player.getScore('icmtoggle', chatmsg.sender.nameTag) === 1) {
        const cancel = `cancel`;
        if( cancel.includes(args[0]) )
        {
            Server.runCommand( `tag "${chatmsg.sender.nameTag}" remove suicide1` );
            Server.broadcast(`§¶§cLexus ► §b§lSuicide was canceled`, chatmsg.sender.nameTag);
        }
        else {
            if(!Server.player.hasTag('suicide1', chatmsg.sender.nameTag)) {
                Server.runCommand( `tag "${chatmsg.sender.nameTag}" add suicide1` );
                return Server.broadcast(`§¶§cLexus ► §c§lAre you sure? Execute again for suicide. Or use §7[ §bLexus.suicide cancel §7] §cto cancel.`, chatmsg.sender.nameTag);
            }
            if(Server.player.hasTag('suicide1', chatmsg.sender.nameTag)) {
                Server.runCommand( `tag "${chatmsg.sender.nameTag}" remove suicide1` );
                Server.runCommand( `scoreboard players set "${chatmsg.sender.nameTag}" suicide 1` );
                Server.runCommand( `scoreboard players set "${chatmsg.sender.nameTag}" hometp 7` );
                Server.broadcastStaff(`§¶§cLexus ► §d${chatmsg.sender.nameTag} §bused suicide command`);
                return Server.broadcast(`§¶§cLexus ► §b§lTo prevent combat logging, suicide will happen in 10 seconds`, chatmsg.sender.nameTag);
            }
        }
}   }   );