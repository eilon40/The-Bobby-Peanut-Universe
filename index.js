const { Client, GatewayIntentBits, EmbedBuilder } = require('discord.js');

const TOKEN = 'PUT_YOUR_DISCORD_TOKEN_HERE';

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

const PEANUT_FACTS = [
    "The peanut is not a true nut - it's a legume.",
    "Peanuts contain more protein than any other nut.",
    "There are four main types of peanuts worldwide.",
    "Americans eat about 3 kg of peanuts per person each year."
];

const PEANUT_QUOTES = [
    "Life is short, eat more peanuts.",
    "Stay calm and eat peanuts.",
    "A day without peanuts is a day wasted."
];

let PEANUT_COUNTER = 0;

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}`);
});

const helpEmbed = new EmbedBuilder()
    .setTitle('🥜 Peanut Bot Commands 🥜')
    .setColor('#FFA500')
    .setDescription('Here are all the commands you can use:')
    .addFields(
        { name: '!peanutfact', value: 'Get a random peanut fact.' },
        { name: '!peanuttypes', value: 'List different peanut types.' },
        { name: '!peanatrate @user', value: 'Rate how peanutty someone is today.' },
        { name: '!peanutbattle @user1 @user2', value: 'Make two users battle with peanuts.' },
        { name: '!throwpeanut @user', value: 'Throw a peanut at someone.' },
        { name: '!peanutquote', value: 'Get a random peanut-related quote.' },
        { name: '!peanutpoll', value: 'Start a poll about peanuts.' },
        { name: '!peanutcount', value: 'See how many times "בוטן" was said.' },
        { name: '!peanutday', value: 'Check if today is International Peanut Day.' },
        { name: '!daysuntilpeanut', value: 'See how many days until Peanut Day.' },
        { name: '!help', value: 'Show this help message.' }
    )
    .setFooter({ text: 'Peanut Bot 🌰 | Enjoy!' });

client.on('messageCreate', async message => {
    const content = message.content;
    if (message.author.bot) return;

    if (content.includes('בוטן')) {
        PEANUT_COUNTER++;
    }
    if (!content.startsWith('!')) return;
    const args = content.trim().split(/ +/g);
    const cmd = args.shift().toLowerCase().replace('!', '');
    const users = message.mentions.users;
    
    switch(cmd) {
        case "peanutfact":
            message.channel.send(PEANUT_FACTS[Math.floor(Math.random() * PEANUT_FACTS.length)]);
            break;
        case "peanuttypes":
            message.channel.send("🥜 Virginia\n🥜 Spanish\n🥜 Runner\n🥜 Valencia");
            break;
        case "peanatrate":
            const user = users.first();
            if (!user) return message.channel.send("You must mention someone!");
            const rate = Math.floor(Math.random() * 101);
            message.channel.send(`${user} is ${rate}% peanut today 🥜`);
            break;
        case "peanutbattle":
            const [u1, u2] = users;
            if (!u1 || !u2) return message.channel.send("You must mention two players!");
            const winner = Math.random() < 0.5 ? u1 : u2;
            message.channel.send(`🥜 The battle is over! The winner is ${winner} 🏆`);
            break;
        case "throwpeanut":
            const user1 = users.first();
            if (!user1) return message.channel.send("You must mention someone!");
            message.channel.send(`${message.author} threw a peanut at ${user1}! 🥜💥`);
            break;
        case "peanutquote":
            message.channel.send(PEANUT_QUOTES[Math.floor(Math.random() * PEANUT_QUOTES.length)]);
            break;
        case "peanutpoll":
            const msg = await message.channel.send("What do you prefer? 🥜\n👍 Roasted\n👎 Not roasted");
            await msg.react('👍');
            await msg.react('👎');
            break;
        case "peanutcount":
            message.channel.send(`The word 'בוטן' has been said ${PEANUT_COUNTER} times in chat.`);
            break;
        case "peanutday":
            const today = new Date();
            if (today.getMonth() === 8 && today.getDate() === 13) { // September is month 8
                message.channel.send("🎉 Today is International Peanut Day! 🥜");
            } else {
                message.channel.send("Today is not Peanut Day 😢");
            }
            break;
        case "daysuntilpeanut":
            const now = new Date();
            let year = now.getFullYear();
            let peanutDay = new Date(year, 8, 13); // September is month 8 (0-indexed)

            // If peanut day already passed this year, calculate for next year
            if (now > peanutDay) {
                peanutDay = new Date(year + 1, 8, 13);
            }

            const diffTime = peanutDay - now;
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            message.channel.send(`There are ${diffDays} days left until International Peanut Day! 🥜`);
            break;
        case "help":
        default:
            message.channel.send({ embeds: [helpEmbed] });
    }
});

client.login(TOKEN);