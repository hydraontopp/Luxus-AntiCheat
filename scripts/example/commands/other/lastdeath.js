import { Server } from '../../../library/Minecraft.js';
const registerInformation = {
    cancelMessage: true,
    name: 'lastdeath',
    description: 'Show Coords to Last Death',
    usage: 'lastdeath',
    example: [
        'lastdeath',
    ]
};
Server.command.register(registerInformation, (chatmsg, args) => {
    const ComString = `execute "${chatmsg.sender.nameTag}" ~~~ function Lexus/asset/deathcoords_asset`;
    if( registerInformation.name.match(chatmsg) ){
        if( Server.player.getScore('icmtoggle', chatmsg.sender.nameTag) === 0) {
            return Server.broadcast(`§¶§cLexus ► §c§lThe Realm Owner currently has Player Commands Disabled`, chatmsg.sender.nameTag);
        } else if( Server.player.getScore('icmtoggle', chatmsg.sender.nameTag) === 1) {
        Server.runCommand( `${ComString}` );
        Server.runCommand( `playsound note.pling "${chatmsg.sender.nameTag}" ~ ~ ~` );
        Server.broadcastStaff(`§¶§cLexus ► §d${chatmsg.sender.nameTag} §bchecked their last death location`);
    }
    }else {
        return Server.broadcast(`§cError Fatal : Command Failed`, chatmsg.sender.nameTag);
    }
});
