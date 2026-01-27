import dotenv from "dotenv"
import sequelize from "../models/sequelize.client.js";
import { Activity, Category, User, Ticket, Reservation } from "../models/index.js";

async function seed(){
    console.log('Syncing database...')
    try{
    const attraction = await Category.create({name: 'attraction'});
    const spectacle = await Category.create({name: 'spectacle'});
    const personnage = await Category.create({name: 'personnage'});

    // Création de chaque ligne dans la table Activity en les liant à leurs category (attraction, spectacle et personnage)
    const deadRise = await Activity.create({
        name: 'Dead Rise',
        fear_level: 5,
        image: "dead_rise",
        description: 'Dead Rise est un roller coaster terrifiant qui plonge les visiteurs dans un univers post-apocalyptique envahi par les morts-vivants. Dès l’embarquement, la tension monte entre lumières vacillantes, cris lointains et silhouettes de zombies surgissant de l’ombre. Les virages serrés, descentes brutales et accélérations soudaines s’enchaînent sans répit, donnant l’impression d’une fuite désespérée face à une horde toujours plus proche. Chaque montée est une fausse accalmie avant une chute vertigineuse, faisant de Dead Rise bien plus qu’un manège : une véritable expérience de survie.',
        category_id: attraction.id,
    });
    console.log(deadRise.id);
    const labyrinthe = await Activity.create({
        name: 'Le labyrinthe des Zombies',
        fear_level: 4,
        image: "labyrinthe",
        description: 'Le Labyrinthe des Zombies plonge les visiteurs au cœur d’un dédale sombre et oppressant où chaque détour peut être le dernier. Entre couloirs étroits, brume épaisse et décors délabrés, des zombies surgissent à tout moment, rendant la progression imprévisible et angoissante. Les cris, les lumières instables et les effets sonores accentuent la tension à chaque pas, obligeant les participants à rester constamment sur leurs gardes. Perdre son chemin devient facile, mais en sortir indemne est un véritable défi de survie.',
        category_id: attraction.id,
    });
    console.log(labyrinthe.id);
    await Activity.create({
        name: 'Le lâcher de Zombies',
        fear_level: 4,
        image: "lacher_zombies",
        description: 'Le Lâcher de Zombies est un spectacle immersif où la frontière entre la scène et le public disparaît complètement. Dans une atmosphère chaotique faite de sirènes, de fumée et de lumières rouges, des hordes de zombies sont libérées et envahissent la zone, créant un sentiment de panique contrôlée et d’urgence permanente. Les comédiens surgissent de toutes parts, interagissent avec le décor et le public, et transforment l’espace en véritable zone de contamination. Plus qu’un spectacle, le Lâcher de Zombies est une expérience intense qui plonge les spectateurs au cœur d’une invasion vivante et terrifiante.',
        category_id: spectacle.id,
    });
    await Activity.create({
        name: 'Massacre à la Tronconneuse',
        fear_level: 3,
        image: "tronçonneuse",
        description: 'Massacre à la Tronçonneuse est un spectacle terrifiant et immersif qui vous plonge au cœur d’un camp abandonné envahi par des zombies incontrôlables. Entre effets spéciaux saisissants, cascades spectaculaires, comédiens surgissant de l’ombre et une mise en scène haletante, chaque minute vous rapproche un peu plus de l’horreur. Le danger rôde, les survivants luttent pour leur vie, et personne n’est vraiment à l’abri… Un show intense, rythmé et visuellement impressionnant, réservé aux visiteurs les plus courageux. Oserez-vous assister au carnage… et en sortir indemne ?',
        category_id: spectacle.id,
    });
    await Activity.create({
        name: 'La survivante',
        fear_level: 2,
        image: "survivante",
        description: 'Plongez au cœur de l’aventure dans Zombieland et vivez un moment unique en rencontrant la Survivante, l’icône de la résistance et l’héroïne qui a inspiré des générations de chasseurs de zombies ! Dans un décor post-apocalyptique soigneusement recréé, vous aurez l’opportunité de discuter avec elle, d’écouter ses conseils de survie, et peut-être même de lui demander un selfie pour immortaliser cette rencontre légendaire.',
        category_id: personnage.id,
    });
    await Activity.create({
        name: 'Frankenstein',
        fear_level: 2,
        image: "frankenstein",
        description: 'Osez affronter la créature… si vous l’osez. Dans les profondeurs du Repaire Maudit de Zombieland, là où la lumière ne perce jamais, Frankenstein vous attend. Son souffle rauque résonne entre les murs couverts de moisissure, ses pas lourds font trembler le sol sous vos pieds. Il n’est pas là pour vous rassurer. Approchez-vous… si vous en avez le courage. Ses yeux jaunes, injectés de sang, vous transpercent. Sa voix grave, déchirée par des siècles de souffrance, murmure des histoires que personne ne devrait entendre. Il se souvient de chaque visage qu’il a croisé… et de ceux qu’il a perdus.',
        category_id: personnage.id,
    });

// Test création d'un compte utilisateur en dur
    const user = await User.create({
        first_name: 'Frank',
        last_name: 'Kenstein',
        password: 'azerty123',
        mail: 'frankenstein@gmail.com',
        address: '30 rue de la grande avenue',
        postcode: '95041',
        city: 'Paris',
        phone_number: '0123456789',
    });

// Creation du Ticket d'entrée unique 
    const ticket = await Ticket.create({
        name: 'Entrée unique',
        price: 50.00,
        date_entrance: new Date(),
    });

// Creation d'une nouvelle réservation
// Générer un numéro aléatoire pour la référence, par exemple 6 chiffres
    const randomReference = Math.floor(100000 + Math.random() * 900000);

    await user.addTicket(ticket, {
      through: {
        quantity: 2,       // nombre de tickets réservés
        reference: randomReference, // référence arbitraire
        date_entrance: new Date(),
        // date_reservation sera automatique grâce à createdAt renommé
      },
    });    

    console.log('✅ Seeding complete!');
    } catch (error) {
		console.log('Error seeding BDD', error);
	} finally {
		// Ferme la connexion à la BDD
		await sequelize.close();
	}
}

await seed();