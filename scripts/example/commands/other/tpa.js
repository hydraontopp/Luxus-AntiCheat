import { Server } from '../../../library/Minecraft.js';
const registerInformation = {
    cancelMessage: true,
    name: 'tpa',
    description: 'Open/Close Teleport Requests',
    usage: '[ open | close | number ]',
    example: [
        'tpa open',
        'tpa close',
        'tpa 10',
    ]
};
Server.command.register(registerInformation, (chatmsg, args) => {
    let tpaIntString = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11'];
    let tpsopen = ['open', 'create'];
    let tpsclose = ['close', 'cancel'];

    if( Server.player.getScore('icmtoggle', chatmsg.sender.nameTag) === 0) {
        return Server.broadcast(`§¶§cLexus ► §c§lThe Realm Owner currently has Player Commands Disabled`, chatmsg.sender.nameTag);
    } else if( Server.player.getScore('icmtoggle', chatmsg.sender.nameTag) === 1) {

        if( registerInformation.name.match(chatmsg) ){
            if(tpsopen.includes(args[0]))
            {
                if(Server.player.hasTag('has_tpa', chatmsg.sender.nameTag))
                {
                    return Server.broadcast(`§¶§cLexus ► §bTPA Channel already created! Your Channel §7:§c "${Server.player.getScore('tpa', chatmsg.sender.nameTag)}" `, chatmsg.sender.nameTag);
                } else 
                {
                    Server.runCommand( `scoreboard players random "${chatmsg.sender.nameTag}" tpa 0 11` );
                    Server.runCommand( `tag "${chatmsg.sender.nameTag}" add has_tpa` );
                    Server.broadcast(`§¶§cLexus ► §bTPA Channel "${Server.player.getScore('tpa', chatmsg.sender.nameTag)}" was created`, chatmsg.sender.nameTag);
                    Server.broadcastStaff(`§¶§cLexus ► §d${chatmsg.sender.nameTag} §bopened a tpa channel`);
                }
            }
            else if(tpsclose.includes(args[0])) {
                if(!Server.player.hasTag('has_tpa', chatmsg.sender.nameTag))
                {
                    return Server.broadcast(`§¶§cLexus ► §bThere was no TPA channel to close" `, chatmsg.sender.nameTag);
                } else 
                {
                    Server.broadcast(`§¶§cLexus ► §bTPA Channel "${Server.player.getScore('tpa', chatmsg.sender.nameTag)}" was closed`, chatmsg.sender.nameTag);
                    Server.runCommand( `scoreboard players reset "${chatmsg.sender.nameTag}" tpa` );
                    Server.runCommand( `tag "${chatmsg.sender.nameTag}" remove has_tpa` );
                    Server.broadcastStaff(`§¶§cLexus ► §d${chatmsg.sender.nameTag} §bclosed their tpa channel manually`);
                }
            }
            else if(tpaIntString.includes(args[0])) {
                Server.runCommand( `playsound note.pling "${chatmsg.sender.nameTag}" ~ ~ ~` );
                Server.runCommand( `tellraw "${chatmsg.sender.nameTag}" {"rawtext":[{"text":"§¶§cLexus ► §6TPA §7: §bSuccessfully teleported to §6"},{"selector":"@p[scores={tpa=${args[0]}}]"}]}` );
                Server.runCommand( `tp "${chatmsg.sender.nameTag}" @p[scores={tpa=${args[0]}}]` );
                Server.runCommand( `execute @p[scores={tpa=${args[0]}}] ~~~ tag @s remove has_tpa` );
                Server.runCommand( `tellraw @a[tag=staffstatus] {"rawtext":[{"text":"§¶§cLexus ► §d${chatmsg.sender.nameTag} §bteleported to §d"},{"selector":"@p[scores={tpa=${args[0]}}]"},{"text":" §bvia §eTPA"}]}` );
                Server.runCommand( `execute @p[scores={tpa=${args[0]}}] ~~~ tellraw @s {"rawtext":[{"text":"§¶§cLexus ► §6TPA §7: §5${chatmsg.sender.nameTag} §bhas §bSuccessfully teleported! Your TPA Channel is now closed."}]}` );
                Server.runCommand( `execute @p[scores={tpa=${args[0]}}] ~~~ scoreboard players reset @s tpa` );
            }else {
                return Server.broadcast(`§¶§cLexus ► §cERROR! §6Usage Example §7:§b§l Lexus.tpa [ open | close | number ]`, chatmsg.sender.nameTag);
            }
        }
        else {
            return Server.broadcast(`§¶§cLexus ► §cERROR 2! §6Usage Example §7:§b§l Lexus.tpa [ open | close | number ]`, chatmsg.sender.nameTag);
        }
    }
});