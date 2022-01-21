import { Server } from '../../../library/Minecraft.js';
const registerInformation = {
    cancelMessage: true,
    name: 'tps',
    description: 'Configure the World Spawn in Lexus',
    usage: '[ server | player ]',
    example: [
        'tps server',
        'tos player'
    ]
};

Server.command.register(registerInformation, (chatmsg, args) => {
    let worldset = ['server'];
    let worldremove = ['player']; 

if(Server.player.hasTag('staffstatus', chatmsg.sender.nameTag)) {
    if(worldset.includes(args[0])) {    
        Server.broadcast(`§¶§cLexus ► §b§lThe TPS is: NOW: 18.8 | 5 MINS: 20.0 | 10 MINS: 20.0 §e`, chatmsg.sender.nameTag);
    }
    else if(worldremove.includes(args[0])) {  
        Server.broadcast(`§¶§cLexus ► §b§lTPS for Player: 20.0`, chatmsg.sender.nameTag);
    }
    else {
        Server.broadcast(`§¶§cLexus ► §cERROR 2! §6Usage Example §7:§b§l Lexus.worldspawn [ set | remove ]`, chatmsg.sender.nameTag);
    }
}
else {
    Server.broadcast(`§¶§cLexus ► §c§lError 4: Only Staff can configure world spawn`, chatmsg.sender.nameTag);
}
});