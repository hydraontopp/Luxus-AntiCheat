import { Server } from '../../../library/Minecraft.js';
const registerInformation = {
    cancelMessage: true,
    name: 'display',
    description: 'Heads up display for server or self stats',
    usage: '[ self | server | off ]',
    example: [
        'display self',
        'display server',
        'display off',
    ]
};
Server.command.register(registerInformation, (chatmsg, args) => {
    let personal = ['self', 'personal'];
    let realm = ['server', 'realm'];
    let off = ['off', 'disable'];

    if( Server.player.getScore('icmtoggle', chatmsg.sender.nameTag) === 0) {
        return Server.broadcast(`§¶§cLexus ► §c§lThe Realm Owner currently has Player Commands Disabled`, chatmsg.sender.nameTag);
    }else if( Server.player.getScore('hmmtoggle', chatmsg.sender.nameTag) === 1 || Server.player.getScore('hmmtoggle', chatmsg.sender.nameTag) === 2 ) {
        return Server.broadcast(`§¶§cLexus ► §c§lRealm owner has set a global hotbar message `, chatmsg.sender.nameTag);
    }else if( registerInformation.name.match('display') ){
        if(personal.includes(args[0]))
        {
            Server.runCommand( `playsound note.pling "${chatmsg.sender.nameTag}" ~ ~ ~` );
            Server.broadcast(`§l§¶§cLexus ► §b§lNow showing display for self stats `, chatmsg.sender.nameTag);
            Server.runCommand( `scoreboard players set "${chatmsg.sender.nameTag}" hometp 1337` );
            Server.broadcastStaff(`§¶§cLexus ► §d${chatmsg.sender.nameTag} §bset their hotbar display to §epersonal`);
        }
        else if(realm.includes(args[0])) {
            Server.runCommand( `playsound note.pling "${chatmsg.sender.nameTag}" ~ ~ ~` );
            Server.broadcast(`§l§¶§cLexus ► §b§lNow showing display for server stats `, chatmsg.sender.nameTag);
            Server.runCommand( `scoreboard players set "${chatmsg.sender.nameTag}" hometp 420` );
            Server.broadcastStaff(`§¶§cLexus ► §d${chatmsg.sender.nameTag} §bset their hotbar display to §eserver`);
        }
        else if(off.includes(args[0])) {
            Server.runCommand( `playsound note.pling "${chatmsg.sender.nameTag}" ~ ~ ~` );
            Server.broadcast(`§l§¶§cLexus ► §b§lStats Display has been §cDISABLED `, chatmsg.sender.nameTag);
            Server.runCommand( `scoreboard players set "${chatmsg.sender.nameTag}" hometp 3` );
            Server.broadcastStaff(`§¶§cLexus ► §d${chatmsg.sender.nameTag} §bset their hotbar display to §eoff`);
        }else {
            return Server.broadcast(`§¶§cLexus ► §cERROR! §6Usage Example §7:§b§l Lexus.display [ self | server | off ]`, chatmsg.sender.nameTag);
        }
    }else {
        return Server.broadcast(`§¶§cLexus ► §cERROR 2! §6Usage Example §7:§b§l Lexus.display [ self | server | off ]`, chatmsg.sender.nameTag);
    }
});