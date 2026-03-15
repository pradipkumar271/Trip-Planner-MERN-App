// const express = require('express');
// const router = express.Router();

// const destinations = {
//     goa: {
//         name: 'Goa', country: 'India', type: 'beach',
//         activities: ['Beach hopping at Baga & Calangute', 'Water sports (parasailing, jet ski)', 'Old Goa churches & heritage walk', 'Dudhsagar Waterfall trek', 'Anjuna flea market', 'Nightlife at Tito\'s Lane'],
//         budget: { low: '₹8,000-12,000', mid: '₹15,000-25,000', high: '₹30,000+' },
//         bestTime: 'November to February',
//         itinerary: [
//             'Day 1: Arrive, check in, evening at Baga Beach & sunset cruise',
//             'Day 2: North Goa tour - Fort Aguada, Calangute, Anjuna market',
//             'Day 3: South Goa - Palolem Beach, Colva, Old Goa churches',
//             'Day 4: Dudhsagar Falls day trip, evening shopping & departure'
//         ]
//     },
//     manali: {
//         name: 'Manali', country: 'India', type: 'mountain',
//         activities: ['Solang Valley snow activities', 'Rohtang Pass (permit required)', 'Hadimba Temple visit', 'River rafting on Beas', 'Old Manali cafes & market', 'Paragliding at Dobhi'],
//         budget: { low: '₹7,000-10,000', mid: '₹12,000-20,000', high: '₹25,000+' },
//         bestTime: 'October to June (avoid monsoon)',
//         itinerary: [
//             'Day 1: Arrive Manali, rest, evening at Mall Road & Old Manali',
//             'Day 2: Solang Valley - snow activities, paragliding',
//             'Day 3: Rohtang Pass or Spiti Valley sightseeing',
//             'Day 4: Hadimba Temple, river rafting, local market & departure'
//         ]
//     },
//     kashmir: {
//         name: 'Kashmir', country: 'India', type: 'nature',
//         activities: ['Dal Lake shikara ride', 'Gulmarg gondola & skiing', 'Pahalgam valley walk', 'Mughal Gardens tour', 'Houseboat stay', 'Sonamarg glacier visit'],
//         budget: { low: '₹12,000-18,000', mid: '₹20,000-35,000', high: '₹40,000+' },
//         bestTime: 'April to October',
//         itinerary: [
//             'Day 1: Arrive Srinagar, Dal Lake shikara ride, houseboat check-in',
//             'Day 2: Gulmarg day trip - gondola ride, snow activities',
//             'Day 3: Pahalgam - Betaab Valley, Aru Valley, Chandanwari',
//             'Day 4: Mughal Gardens, local market, departure'
//         ]
//     },
//     jaipur: {
//         name: 'Jaipur', country: 'India', type: 'culture',
//         activities: ['Amber Fort elephant ride', 'Hawa Mahal photography', 'City Palace tour', 'Jantar Mantar observatory', 'Johari Bazaar shopping', 'Nahargarh Fort sunset'],
//         budget: { low: '₹5,000-8,000', mid: '₹10,000-18,000', high: '₹22,000+' },
//         bestTime: 'October to March',
//         itinerary: [
//             'Day 1: Arrive, Hawa Mahal, Johari Bazaar, City Palace',
//             'Day 2: Amber Fort, Jaigarh Fort, Nahargarh sunset',
//             'Day 3: Jantar Mantar, Albert Hall Museum, local food tour',
//             'Day 4: Birla Temple, shopping at Bapu Bazaar, departure'
//         ]
//     },
//     dubai: {
//         name: 'Dubai', country: 'UAE', type: 'luxury',
//         activities: ['Burj Khalifa observation deck', 'Desert safari with BBQ dinner', 'Dubai Mall & fountain show', 'Palm Jumeirah tour', 'Gold & Spice Souk', 'Dhow cruise dinner'],
//         budget: { low: '₹35,000-50,000', mid: '₹55,000-80,000', high: '₹1,00,000+' },
//         bestTime: 'November to April',
//         itinerary: [
//             'Day 1: Arrive, Dubai Mall, Burj Khalifa at sunset, fountain show',
//             'Day 2: Desert safari, camel ride, BBQ dinner under stars',
//             'Day 3: Palm Jumeirah, Atlantis, Gold & Spice Souk, Dhow cruise',
//             'Day 4: Dubai Frame, JBR Beach, last-minute shopping, departure'
//         ]
//     },
//     bali: {
//         name: 'Bali', country: 'Indonesia', type: 'tropical',
//         activities: ['Ubud rice terraces & monkey forest', 'Tanah Lot temple at sunset', 'Kuta & Seminyak beach clubs', 'Mount Batur sunrise trek', 'Balinese cooking class', 'Spa & wellness retreat'],
//         budget: { low: '₹40,000-55,000', mid: '₹60,000-90,000', high: '₹1,10,000+' },
//         bestTime: 'April to October',
//         itinerary: [
//             'Day 1: Arrive Denpasar, Kuta Beach, sunset at Tanah Lot',
//             'Day 2: Ubud - rice terraces, monkey forest, art market',
//             'Day 3: Mount Batur sunrise trek, hot springs, Seminyak beach club',
//             'Day 4: Spa morning, Nusa Dua snorkeling, departure'
//         ]
//     },
//     shimla: {
//         name: 'Shimla', country: 'India', type: 'hill',
//         activities: ['Mall Road walk & shopping', 'Kufri snow activities', 'Christ Church visit', 'Jakhu Temple trek', 'Toy train ride', 'Chadwick Falls'],
//         budget: { low: '₹6,000-9,000', mid: '₹10,000-16,000', high: '₹20,000+' },
//         bestTime: 'October to June',
//         itinerary: [
//             'Day 1: Arrive, Mall Road, Ridge, Christ Church, Lakkar Bazaar',
//             'Day 2: Kufri - snow activities, Himalayan Nature Park',
//             'Day 3: Jakhu Temple, Chadwick Falls, Scandal Point',
//             'Day 4: Toy train experience, local market, departure'
//         ]
//     },
//     rishikesh: {
//         name: 'Rishikesh', country: 'India', type: 'adventure',
//         activities: ['White water river rafting', 'Bungee jumping at Mohan Chatti', 'Laxman Jhula & Ram Jhula walk', 'Ganga Aarti at Triveni Ghat', 'Yoga & meditation retreat', 'Neelkanth Mahadev Temple'],
//         budget: { low: '₹4,000-7,000', mid: '₹8,000-14,000', high: '₹18,000+' },
//         bestTime: 'September to June',
//         itinerary: [
//             'Day 1: Arrive, Laxman Jhula, Ram Jhula, evening Ganga Aarti',
//             'Day 2: River rafting (16km stretch), cliff jumping, beach camping',
//             'Day 3: Bungee jumping or zip-lining, Neelkanth Temple trek',
//             'Day 4: Morning yoga, Beatles Ashram, local market, departure'
//         ]
//     },
//     paris: {
//         name: 'Paris', country: 'France', type: 'romantic',
//         activities: ['Eiffel Tower visit', 'Louvre Museum', 'Seine river cruise', 'Montmartre & Sacre Coeur', 'Champs-Elysees shopping', 'Versailles Palace day trip'],
//         budget: { low: '₹90,000-1,10,000', mid: '₹1,20,000-1,80,000', high: '₹2,00,000+' },
//         bestTime: 'April to June, September to November',
//         itinerary: [
//             'Day 1: Arrive, Eiffel Tower, Seine cruise, Champs-Elysees',
//             'Day 2: Louvre Museum, Notre Dame, Latin Quarter lunch',
//             'Day 3: Versailles Palace day trip',
//             'Day 4: Montmartre, Sacre Coeur, shopping, departure'
//         ]
//     },
//     tokyo: {
//         name: 'Tokyo', country: 'Japan', type: 'modern',
//         activities: ['Shibuya Crossing & Harajuku', 'Senso-ji Temple Asakusa', 'Akihabara electronics district', 'Mount Fuji day trip', 'Shinjuku nightlife', 'TeamLab digital art museum'],
//         budget: { low: '₹75,000-95,000', mid: '₹1,00,000-1,50,000', high: '₹1,80,000+' },
//         bestTime: 'March to May (cherry blossom), October to November',
//         itinerary: [
//             'Day 1: Arrive, Shibuya Crossing, Harajuku, Shinjuku',
//             'Day 2: Senso-ji Temple, Akihabara, TeamLab museum',
//             'Day 3: Mount Fuji day trip or Nikko',
//             'Day 4: Tsukiji market, Odaiba, departure'
//         ]
//     }
// };

// const intentKeywords = {
//     greeting:     ['hello', 'hi', 'hey', 'good morning', 'good evening', 'good afternoon', 'namaste', 'hii', 'helo', 'howdy', 'greetings', 'sup', 'whats up', 'how are you'],
//     hotel:        ['hotel', 'hotels', 'stay', 'staying', 'accommodation', 'hostel', 'resort', 'lodge', 'guesthouse', 'room', 'rooms', 'where to stay', 'place to stay', 'oyo', 'airbnb', 'rent'],
//     budget:       ['budget', 'cheap', 'affordable', 'cost', 'price', 'money', 'spend', 'spending', 'expensive', 'low budget', 'backpack', 'economical', 'inexpensive', 'how much', 'charges', 'fees', 'rate', 'rates', 'rupees', 'dollars'],
//     itinerary:    ['itinerary', 'plan', 'schedule', 'days', 'trip plan', 'day by day', 'day 1', 'what to do', 'how to spend', 'route', 'agenda', 'guide', 'suggest trip', 'plan trip'],
//     activities:   ['activities', 'things to do', 'places', 'visit', 'see', 'explore', 'fun', 'sightseeing', 'attractions', 'spots', 'must see', 'must visit', 'tourist', 'tourism', 'what to see', 'where to go'],
//     food:         ['food', 'eat', 'eating', 'restaurant', 'restaurants', 'cuisine', 'dish', 'dishes', 'local food', 'street food', 'famous food', 'what to eat', 'dining', 'cafe', 'cafes', 'snacks', 'breakfast', 'lunch', 'dinner'],
//     transport:    ['transport', 'transportation', 'how to reach', 'how to go', 'travel by', 'bus', 'train', 'flight', 'flights', 'cab', 'taxi', 'auto', 'bike', 'car', 'drive', 'reach', 'getting there', 'from mumbai', 'from delhi', 'from ahmedabad'],
//     weather:      ['weather', 'climate', 'temperature', 'season', 'monsoon', 'rain', 'rainy', 'summer', 'winter', 'best time', 'when to visit', 'when to go', 'which month', 'which season'],
//     beach:        ['beach', 'sea', 'ocean', 'coastal', 'island', 'tropical', 'sand', 'waves', 'swimming', 'snorkeling', 'scuba', 'water sports', 'seaside'],
//     mountain:     ['mountain', 'hill', 'snow', 'trek', 'trekking', 'hiking', 'valley', 'peak', 'altitude', 'camp', 'camping', 'glacier', 'hill station'],
//     adventure:    ['adventure', 'thrill', 'extreme', 'rafting', 'bungee', 'paragliding', 'skydiving', 'zip line', 'zipline', 'rock climbing', 'adrenaline', 'exciting', 'thrilling'],
//     romantic:     ['honeymoon', 'romantic', 'couple', 'anniversary', 'valentine', 'love', 'partner', 'wife', 'husband', 'girlfriend', 'boyfriend', 'romance', 'getaway'],
//     family:       ['family', 'kids', 'children', 'parents', 'child friendly', 'toddler', 'grandparents', 'group', 'safe for kids', 'family trip', 'family vacation'],
//     visa:         ['visa', 'passport', 'documents', 'document', 'permit', 'entry', 'immigration', 'customs', 'travel documents', 'id proof'],
//     packing:      ['pack', 'packing', 'carry', 'luggage', 'bag', 'bags', 'what to bring', 'what to carry', 'clothes', 'clothing', 'essentials', 'checklist'],
//     safety:       ['safe', 'safety', 'danger', 'dangerous', 'crime', 'secure', 'security', 'is it safe', 'precaution', 'precautions', 'careful'],
//     india:        ['india', 'indian', 'domestic', 'within india', 'inside india'],
//     international:['international', 'abroad', 'foreign', 'overseas', 'outside india', 'world tour']
// };

// function detectIntents(msg) {
//     const found = {};
//     for (const [intent, keywords] of Object.entries(intentKeywords)) {
//         if (keywords.some(k => msg.includes(k))) found[intent] = true;
//     }
//     return found;
// }

// function matchDestination(msg) {
//     const lower = msg.toLowerCase();
//     return Object.values(destinations).find(d =>
//         lower.includes(d.name.toLowerCase()) ||
//         lower.includes(d.country.toLowerCase())
//     );
// }

// // Extract unknown place name from message
// function extractPlaceName(msg) {
//     const patterns = [
//         /(?:trip to|visit|travel to|going to|plan.*?for|itinerary for|hotels? (?:at|in)|places? in|guide for|explore)\s+([a-z][a-z\s]{1,30}?)(?:\s*$|[,.])/i,
//         /(?:in|at|near)\s+([A-Z][a-z]+(?:\s+[A-Z][a-z]+)?)/
//     ];
//     for (const pattern of patterns) {
//         const match = msg.match(pattern);
//         if (match) return match[1].trim();
//     }
//     return null;
// }

// function handleUnknownPlace(placeName) {
//     const name = placeName.charAt(0).toUpperCase() + placeName.slice(1).toLowerCase();
//     return `I don't have a built-in guide for ${name} yet, but here's how you can plan your trip:\n\nFind Hotels & Stays:\n- MakeMyTrip: makemytrip.com\n- OYO Rooms: oyorooms.com\n- Booking.com\n- Goibibo: goibibo.com\n\nFind Things To Do:\n- TripAdvisor: tripadvisor.in/Search?q=${encodeURIComponent(name)}\n- Google: google.com/search?q=places+to+visit+in+${encodeURIComponent(name)}\n\nBook Transport:\n- Trains: irctc.co.in\n- Buses: redbus.in\n- Flights: skyscanner.co.in\n\nGeneral Travel Tips:\n- Check local weather before packing\n- Carry cash as small towns may have limited ATMs\n- Book stays in advance on weekends\n- Check Google Maps for nearby attractions\n\nWant me to suggest a nearby popular destination I have full guides for?`;
// }

// function formatDestinationReply(dest, focus) {
//     const lines = [];
//     lines.push(`Great choice! Here is your complete travel guide for ${dest.name}, ${dest.country}.`);
//     lines.push('');
//     lines.push(`Best time to visit: ${dest.bestTime}`);
//     lines.push('');

//     if (!focus || focus === 'activities') {
//         lines.push('Top Activities:');
//         dest.activities.forEach((a, i) => lines.push(`${i + 1}. ${a}`));
//         lines.push('');
//     }

//     if (!focus || focus === 'budget') {
//         lines.push('Budget Breakdown (per person):');
//         lines.push(`  Budget traveler: ${dest.budget.low}`);
//         lines.push(`  Mid-range: ${dest.budget.mid}`);
//         lines.push(`  Luxury: ${dest.budget.high}`);
//         lines.push('');
//     }

//     if (!focus || focus === 'itinerary') {
//         lines.push('4-Day Itinerary:');
//         dest.itinerary.forEach(day => lines.push(day));
//         lines.push('');
//     }

//     lines.push('Need more details on accommodation, food, or transport? Just ask!');
//     return lines.join('\n');
// }

// function generateReply(message) {
//     // Strip conversational prefixes so intent keywords are reachable
//     const msg = message.toLowerCase().trim()
//         .replace(/^(can you|could you|do you|please|i want to|i need to|help me|tell me)\s+/g, '');

//     // Greeting
//     if (greetings.some(g => msg === g || msg.startsWith(g + ' ') || msg.startsWith(g + '!'))) {
//         return 'Hello! I am your AI travel assistant. I can help you plan trips to destinations like Goa, Manali, Kashmir, Jaipur, Shimla, Rishikesh, Dubai, Bali, Paris, and Tokyo.\n\nTry asking:\n- "Plan a trip to Goa"\n- "Budget trip to Manali"\n- "4 day itinerary for Jaipur"\n- "Best beach destinations in India"\n- "Honeymoon trip suggestions"';
//     }

//     // Direct destination match
//     const dest = matchDestination(msg);
//     if (dest) {
//         let focus = null;
//         if (budgetKeywords.some(k => msg.includes(k))) focus = 'budget';
//         else if (itineraryKeywords.some(k => msg.includes(k))) focus = 'itinerary';
//         else if (activityKeywords.some(k => msg.includes(k))) focus = 'activities';
//         return formatDestinationReply(dest, focus);
//     }

//     // Beach destinations
//     if (beachKeywords.some(k => msg.includes(k))) {
//         const beachDests = Object.values(destinations).filter(d => ['beach', 'tropical'].includes(d.type));
//         return 'Top Beach Destinations for you:\n\n' + beachDests.map((d, i) =>
//             `${i + 1}. ${d.name}, ${d.country}\n   Best time: ${d.bestTime}\n   Budget: ${d.budget.low} (budget) | ${d.budget.mid} (mid-range)`
//         ).join('\n\n') + '\n\nAsk me to plan a full trip to any of these!';
//     }

//     // Mountain/hill destinations
//     if (mountainKeywords.some(k => msg.includes(k))) {
//         const hillDests = Object.values(destinations).filter(d => ['mountain', 'hill', 'nature'].includes(d.type));
//         return 'Top Hill & Mountain Destinations:\n\n' + hillDests.map((d, i) =>
//             `${i + 1}. ${d.name}, ${d.country}\n   Best time: ${d.bestTime}\n   Budget: ${d.budget.low} (budget) | ${d.budget.mid} (mid-range)`
//         ).join('\n\n') + '\n\nAsk me to plan a full trip to any of these!';
//     }

//     // Adventure
//     if (adventureKeywords.some(k => msg.includes(k))) {
//         return 'Top Adventure Destinations:\n\n1. Rishikesh, India\n   River rafting, bungee jumping, zip-lining\n   Budget: ₹4,000-7,000\n\n2. Manali, India\n   Paragliding, snow sports, trekking\n   Budget: ₹7,000-10,000\n\n3. Bali, Indonesia\n   Mount Batur trek, surfing, cliff jumping\n   Budget: ₹40,000-55,000\n\nWant a full itinerary for any of these? Just ask!';
//     }

//     // Romantic / honeymoon
//     if (romanticKeywords.some(k => msg.includes(k))) {
//         return 'Top Romantic Destinations:\n\n1. Kashmir, India - Houseboat on Dal Lake, Gulmarg snow\n   Budget: ₹20,000-35,000 per couple\n\n2. Goa, India - Beach sunsets, candlelit dinners\n   Budget: ₹15,000-25,000 per couple\n\n3. Bali, Indonesia - Villa stays, temple sunsets\n   Budget: ₹60,000-90,000 per couple\n\n4. Paris, France - Eiffel Tower, Seine cruise\n   Budget: ₹1,20,000-1,80,000 per couple\n\nWant a detailed honeymoon itinerary for any destination?';
//     }

//     // Family
//     if (familyKeywords.some(k => msg.includes(k))) {
//         return 'Best Family-Friendly Destinations:\n\n1. Jaipur, India - Forts, palaces, cultural experiences\n   Budget: ₹10,000-18,000 per person\n\n2. Shimla, India - Safe, scenic, snow for kids\n   Budget: ₹10,000-16,000 per person\n\n3. Goa, India - Beaches, water sports, relaxed vibe\n   Budget: ₹15,000-25,000 per person\n\n4. Dubai, UAE - Theme parks, desert safari, malls\n   Budget: ₹55,000-80,000 per person\n\nAsk me for a detailed family itinerary!';
//     }

//     // Hotel / accommodation
//     if (hotelKeywords.some(k => msg.includes(k))) {
//         const dest = matchDestination(msg);
//         if (dest) {
//             return `Here are accommodation options in ${dest.name}:\n\nBudget: Hostels & guesthouses — ${dest.budget.low}\nMid-range: 3-star hotels — ${dest.budget.mid}\nLuxury: 5-star resorts — ${dest.budget.high}\n\nTip: Book on MakeMyTrip, Goibibo, or Booking.com for best deals.\nWant a full trip plan for ${dest.name}?`;
//         }
//         const unknownPlace = extractPlaceName(msg);
//         if (unknownPlace) return handleUnknownPlace(unknownPlace);
//         return 'I can show hotel options for these destinations I know:\n\nIndia: Goa, Manali, Kashmir, Jaipur, Shimla, Rishikesh\nInternational: Dubai, Bali, Paris, Tokyo\n\nFor any other city, check MakeMyTrip.com, Booking.com, OYO Rooms, or Goibibo.com';
//     }

//     // Budget travel general
//     if (budgetKeywords.some(k => msg.includes(k))) {
//         return 'Best Budget Destinations in India:\n\n1. Rishikesh - ₹4,000-7,000 (adventure + spirituality)\n2. Shimla - ₹6,000-9,000 (hills + snow)\n3. Jaipur - ₹5,000-8,000 (culture + history)\n4. Goa - ₹8,000-12,000 (beach + nightlife)\n5. Manali - ₹7,000-10,000 (mountains + adventure)\n\nBudget Tips:\n- Travel in off-season for 30-40% cheaper rates\n- Book trains instead of flights\n- Stay in hostels or guesthouses\n- Eat at local dhabas and street food stalls\n- Book in advance for better deals\n\nWant a detailed budget plan for any destination?';
//     }

//     // India destinations
//     if (msg.includes('india') || msg.includes('indian')) {
//         const indiaDests = Object.values(destinations).filter(d => d.country === 'India');
//         return 'Top Destinations in India:\n\n' + indiaDests.map((d, i) =>
//             `${i + 1}. ${d.name} (${d.type}) - Best time: ${d.bestTime}`
//         ).join('\n') + '\n\nAsk me to plan a full trip to any of these!';
//     }

//     // International
//     if (msg.includes('international') || msg.includes('abroad') || msg.includes('foreign') || msg.includes('overseas')) {
//         const intlDests = Object.values(destinations).filter(d => d.country !== 'India');
//         return 'Top International Destinations:\n\n' + intlDests.map((d, i) =>
//             `${i + 1}. ${d.name}, ${d.country}\n   Best time: ${d.bestTime}\n   Budget: ${d.budget.mid} (mid-range)`
//         ).join('\n\n') + '\n\nAsk me to plan a full trip to any of these!';
//     }

//     // General trip planning help
//     if (msg.includes('help') || msg.includes('suggest') || msg.includes('recommend') || msg.includes('where')) {
//         return 'I can help you plan trips to these destinations:\n\nIndia: Goa, Manali, Kashmir, Jaipur, Shimla, Rishikesh\nInternational: Dubai, Bali, Paris, Tokyo\n\nJust tell me:\n- Where you want to go\n- Your budget range\n- Number of days\n- Travel style (adventure, relaxation, culture, romance)\n\nExample: "Plan a 4 day budget trip to Goa" or "Honeymoon itinerary for Kashmir"';
//     }

//     // Try to detect any unknown place name before giving up
//     const unknownPlace = extractPlaceName(msg);
//     if (unknownPlace) return handleUnknownPlace(unknownPlace);

//     // Default fallback
//     return 'I can help you plan amazing trips! I have detailed guides for:\n\nIndia: Goa, Manali, Kashmir, Jaipur, Shimla, Rishikesh\nInternational: Dubai, Bali, Paris, Tokyo\n\nOr ask about ANY destination — I will give you booking links and travel tips!\n\nTry asking:\n- "Plan a trip to Goa"\n- "Hotels in Amreli"\n- "Trip to Surat"\n- "Budget beach destinations"\n- "Honeymoon trip suggestions"';
// }

// router.post('/chat', (req, res) => {
//     try {
//         const { message } = req.body;
//         if (!message || !message.trim()) {
//             return res.status(400).json({ message: 'Message is required' });
//         }
//         const reply = generateReply(message.trim());
//         res.json({ reply });
//     } catch (error) {
//         console.error('AI Chat Error:', error);
//         res.status(500).json({ message: 'Server Error' });
//     }
// });

// module.exports = router;
const express = require('express');
const router = express.Router();

const destinations = {
    goa: {
        name: 'Goa', country: 'India', type: 'beach',
        activities: ['Beach hopping at Baga & Calangute', 'Water sports (parasailing, jet ski)', 'Old Goa churches & heritage walk', 'Dudhsagar Waterfall trek', 'Anjuna flea market', 'Nightlife at Tito\'s Lane'],
        budget: { low: '₹8,000-12,000', mid: '₹15,000-25,000', high: '₹30,000+' },
        bestTime: 'November to February',
        itinerary: [
            'Day 1: Arrive, check in, evening at Baga Beach & sunset cruise',
            'Day 2: North Goa tour - Fort Aguada, Calangute, Anjuna market',
            'Day 3: South Goa - Palolem Beach, Colva, Old Goa churches',
            'Day 4: Dudhsagar Falls day trip, evening shopping & departure'
        ]
    },
    manali: {
        name: 'Manali', country: 'India', type: 'mountain',
        activities: ['Solang Valley snow activities', 'Rohtang Pass (permit required)', 'Hadimba Temple visit', 'River rafting on Beas', 'Old Manali cafes & market', 'Paragliding at Dobhi'],
        budget: { low: '₹7,000-10,000', mid: '₹12,000-20,000', high: '₹25,000+' },
        bestTime: 'October to June (avoid monsoon)',
        itinerary: [
            'Day 1: Arrive Manali, rest, evening at Mall Road & Old Manali',
            'Day 2: Solang Valley - snow activities, paragliding',
            'Day 3: Rohtang Pass or Spiti Valley sightseeing',
            'Day 4: Hadimba Temple, river rafting, local market & departure'
        ]
    },
    kashmir: {
        name: 'Kashmir', country: 'India', type: 'nature',
        activities: ['Dal Lake shikara ride', 'Gulmarg gondola & skiing', 'Pahalgam valley walk', 'Mughal Gardens tour', 'Houseboat stay', 'Sonamarg glacier visit'],
        budget: { low: '₹12,000-18,000', mid: '₹20,000-35,000', high: '₹40,000+' },
        bestTime: 'April to October',
        itinerary: [
            'Day 1: Arrive Srinagar, Dal Lake shikara ride, houseboat check-in',
            'Day 2: Gulmarg day trip - gondola ride, snow activities',
            'Day 3: Pahalgam - Betaab Valley, Aru Valley, Chandanwari',
            'Day 4: Mughal Gardens, local market, departure'
        ]
    },
    jaipur: {
        name: 'Jaipur', country: 'India', type: 'culture',
        activities: ['Amber Fort elephant ride', 'Hawa Mahal photography', 'City Palace tour', 'Jantar Mantar observatory', 'Johari Bazaar shopping', 'Nahargarh Fort sunset'],
        budget: { low: '₹5,000-8,000', mid: '₹10,000-18,000', high: '₹22,000+' },
        bestTime: 'October to March',
        itinerary: [
            'Day 1: Arrive, Hawa Mahal, Johari Bazaar, City Palace',
            'Day 2: Amber Fort, Jaigarh Fort, Nahargarh sunset',
            'Day 3: Jantar Mantar, Albert Hall Museum, local food tour',
            'Day 4: Birla Temple, shopping at Bapu Bazaar, departure'
        ]
    },
    dubai: {
        name: 'Dubai', country: 'UAE', type: 'luxury',
        activities: ['Burj Khalifa observation deck', 'Desert safari with BBQ dinner', 'Dubai Mall & fountain show', 'Palm Jumeirah tour', 'Gold & Spice Souk', 'Dhow cruise dinner'],
        budget: { low: '₹35,000-50,000', mid: '₹55,000-80,000', high: '₹1,00,000+' },
        bestTime: 'November to April',
        itinerary: [
            'Day 1: Arrive, Dubai Mall, Burj Khalifa at sunset, fountain show',
            'Day 2: Desert safari, camel ride, BBQ dinner under stars',
            'Day 3: Palm Jumeirah, Atlantis, Gold & Spice Souk, Dhow cruise',
            'Day 4: Dubai Frame, JBR Beach, last-minute shopping, departure'
        ]
    },
    bali: {
        name: 'Bali', country: 'Indonesia', type: 'tropical',
        activities: ['Ubud rice terraces & monkey forest', 'Tanah Lot temple at sunset', 'Kuta & Seminyak beach clubs', 'Mount Batur sunrise trek', 'Balinese cooking class', 'Spa & wellness retreat'],
        budget: { low: '₹40,000-55,000', mid: '₹60,000-90,000', high: '₹1,10,000+' },
        bestTime: 'April to October',
        itinerary: [
            'Day 1: Arrive Denpasar, Kuta Beach, sunset at Tanah Lot',
            'Day 2: Ubud - rice terraces, monkey forest, art market',
            'Day 3: Mount Batur sunrise trek, hot springs, Seminyak beach club',
            'Day 4: Spa morning, Nusa Dua snorkeling, departure'
        ]
    },
    shimla: {
        name: 'Shimla', country: 'India', type: 'hill',
        activities: ['Mall Road walk & shopping', 'Kufri snow activities', 'Christ Church visit', 'Jakhu Temple trek', 'Toy train ride', 'Chadwick Falls'],
        budget: { low: '₹6,000-9,000', mid: '₹10,000-16,000', high: '₹20,000+' },
        bestTime: 'October to June',
        itinerary: [
            'Day 1: Arrive, Mall Road, Ridge, Christ Church, Lakkar Bazaar',
            'Day 2: Kufri - snow activities, Himalayan Nature Park',
            'Day 3: Jakhu Temple, Chadwick Falls, Scandal Point',
            'Day 4: Toy train experience, local market, departure'
        ]
    },
    rishikesh: {
        name: 'Rishikesh', country: 'India', type: 'adventure',
        activities: ['White water river rafting', 'Bungee jumping at Mohan Chatti', 'Laxman Jhula & Ram Jhula walk', 'Ganga Aarti at Triveni Ghat', 'Yoga & meditation retreat', 'Neelkanth Mahadev Temple'],
        budget: { low: '₹4,000-7,000', mid: '₹8,000-14,000', high: '₹18,000+' },
        bestTime: 'September to June',
        itinerary: [
            'Day 1: Arrive, Laxman Jhula, Ram Jhula, evening Ganga Aarti',
            'Day 2: River rafting (16km stretch), cliff jumping, beach camping',
            'Day 3: Bungee jumping or zip-lining, Neelkanth Temple trek',
            'Day 4: Morning yoga, Beatles Ashram, local market, departure'
        ]
    },
    paris: {
        name: 'Paris', country: 'France', type: 'romantic',
        activities: ['Eiffel Tower visit', 'Louvre Museum', 'Seine river cruise', 'Montmartre & Sacre Coeur', 'Champs-Elysees shopping', 'Versailles Palace day trip'],
        budget: { low: '₹90,000-1,10,000', mid: '₹1,20,000-1,80,000', high: '₹2,00,000+' },
        bestTime: 'April to June, September to November',
        itinerary: [
            'Day 1: Arrive, Eiffel Tower, Seine cruise, Champs-Elysees',
            'Day 2: Louvre Museum, Notre Dame, Latin Quarter lunch',
            'Day 3: Versailles Palace day trip',
            'Day 4: Montmartre, Sacre Coeur, shopping, departure'
        ]
    },
    tokyo: {
        name: 'Tokyo', country: 'Japan', type: 'modern',
        activities: ['Shibuya Crossing & Harajuku', 'Senso-ji Temple Asakusa', 'Akihabara electronics district', 'Mount Fuji day trip', 'Shinjuku nightlife', 'TeamLab digital art museum'],
        budget: { low: '₹75,000-95,000', mid: '₹1,00,000-1,50,000', high: '₹1,80,000+' },
        bestTime: 'March to May (cherry blossom), October to November',
        itinerary: [
            'Day 1: Arrive, Shibuya Crossing, Harajuku, Shinjuku',
            'Day 2: Senso-ji Temple, Akihabara, TeamLab museum',
            'Day 3: Mount Fuji day trip or Nikko',
            'Day 4: Tsukiji market, Odaiba, departure'
        ]
    }
};

// ─── FIX: All keyword arrays extracted from intentKeywords for direct use ───
const greetings = ['hello', 'hi', 'hey', 'good morning', 'good evening', 'good afternoon', 'namaste', 'hii', 'helo', 'howdy', 'greetings', 'sup', 'whats up', 'how are you'];
const hotelKeywords = ['hotel', 'hotels', 'stay', 'staying', 'accommodation', 'hostel', 'resort', 'lodge', 'guesthouse', 'room', 'rooms', 'where to stay', 'place to stay', 'oyo', 'airbnb', 'rent'];
const budgetKeywords = ['budget', 'cheap', 'affordable', 'cost', 'price', 'money', 'spend', 'spending', 'expensive', 'low budget', 'backpack', 'economical', 'inexpensive', 'how much', 'charges', 'fees', 'rate', 'rates', 'rupees', 'dollars'];
const itineraryKeywords = ['itinerary', 'plan', 'schedule', 'days', 'trip plan', 'day by day', 'day 1', 'what to do', 'how to spend', 'route', 'agenda', 'guide', 'suggest trip', 'plan trip'];
const activityKeywords = ['activities', 'things to do', 'places', 'visit', 'see', 'explore', 'fun', 'sightseeing', 'attractions', 'spots', 'must see', 'must visit', 'tourist', 'tourism', 'what to see', 'where to go'];
const beachKeywords = ['beach', 'sea', 'ocean', 'coastal', 'island', 'tropical', 'sand', 'waves', 'swimming', 'snorkeling', 'scuba', 'water sports', 'seaside'];
const mountainKeywords = ['mountain', 'hill', 'snow', 'trek', 'trekking', 'hiking', 'valley', 'peak', 'altitude', 'camp', 'camping', 'glacier', 'hill station'];
const adventureKeywords = ['adventure', 'thrill', 'extreme', 'rafting', 'bungee', 'paragliding', 'skydiving', 'zip line', 'zipline', 'rock climbing', 'adrenaline', 'exciting', 'thrilling'];
const romanticKeywords = ['honeymoon', 'romantic', 'couple', 'anniversary', 'valentine', 'love', 'partner', 'wife', 'husband', 'girlfriend', 'boyfriend', 'romance', 'getaway'];
const familyKeywords = ['family', 'kids', 'children', 'parents', 'child friendly', 'toddler', 'grandparents', 'group', 'safe for kids', 'family trip', 'family vacation'];

const intentKeywords = {
    greeting: greetings,
    hotel: hotelKeywords,
    budget: budgetKeywords,
    itinerary: itineraryKeywords,
    activities: activityKeywords,
    food: ['food', 'eat', 'eating', 'restaurant', 'restaurants', 'cuisine', 'dish', 'dishes', 'local food', 'street food', 'famous food', 'what to eat', 'dining', 'cafe', 'cafes', 'snacks', 'breakfast', 'lunch', 'dinner'],
    transport: ['transport', 'transportation', 'how to reach', 'how to go', 'travel by', 'bus', 'train', 'flight', 'flights', 'cab', 'taxi', 'auto', 'bike', 'car', 'drive', 'reach', 'getting there', 'from mumbai', 'from delhi', 'from ahmedabad'],
    weather: ['weather', 'climate', 'temperature', 'season', 'monsoon', 'rain', 'rainy', 'summer', 'winter', 'best time', 'when to visit', 'when to go', 'which month', 'which season'],
    beach: beachKeywords,
    mountain: mountainKeywords,
    adventure: adventureKeywords,
    romantic: romanticKeywords,
    family: familyKeywords,
    visa: ['visa', 'passport', 'documents', 'document', 'permit', 'entry', 'immigration', 'customs', 'travel documents', 'id proof'],
    packing: ['pack', 'packing', 'carry', 'luggage', 'bag', 'bags', 'what to bring', 'what to carry', 'clothes', 'clothing', 'essentials', 'checklist'],
    safety: ['safe', 'safety', 'danger', 'dangerous', 'crime', 'secure', 'security', 'is it safe', 'precaution', 'precautions', 'careful'],
    india: ['india', 'indian', 'domestic', 'within india', 'inside india'],
    international: ['international', 'abroad', 'foreign', 'overseas', 'outside india', 'world tour']
};

function detectIntents(msg) {
    const found = {};
    for (const [intent, keywords] of Object.entries(intentKeywords)) {
        if (keywords.some(k => msg.includes(k))) found[intent] = true;
    }
    return found;
}

function matchDestination(msg) {
    const lower = msg.toLowerCase();
    return Object.values(destinations).find(d =>
        lower.includes(d.name.toLowerCase()) ||
        lower.includes(d.country.toLowerCase())
    );
}

function extractPlaceName(msg) {
    const patterns = [
        /(?:trip to|visit|travel to|going to|plan.*?for|itinerary for|hotels? (?:at|in)|places? in|guide for|explore)\s+([a-z][a-z\s]{1,30}?)(?:\s*$|[,.])/i,
        /(?:in|at|near)\s+([A-Z][a-z]+(?:\s+[A-Z][a-z]+)?)/
    ];
    for (const pattern of patterns) {
        const match = msg.match(pattern);
        if (match) return match[1].trim();
    }
    return null;
}

function handleUnknownPlace(placeName) {
    const name = placeName.charAt(0).toUpperCase() + placeName.slice(1).toLowerCase();
    return `I don't have a built-in guide for ${name} yet, but here's how you can plan your trip:\n\nFind Hotels & Stays:\n- MakeMyTrip: makemytrip.com\n- OYO Rooms: oyorooms.com\n- Booking.com\n- Goibibo: goibibo.com\n\nFind Things To Do:\n- TripAdvisor: tripadvisor.in/Search?q=${encodeURIComponent(name)}\n- Google: google.com/search?q=places+to+visit+in+${encodeURIComponent(name)}\n\nBook Transport:\n- Trains: irctc.co.in\n- Buses: redbus.in\n- Flights: skyscanner.co.in\n\nGeneral Travel Tips:\n- Check local weather before packing\n- Carry cash as small towns may have limited ATMs\n- Book stays in advance on weekends\n- Check Google Maps for nearby attractions\n\nWant me to suggest a nearby popular destination I have full guides for?`;
}

function formatDestinationReply(dest, focus) {
    const lines = [];
    lines.push(`Great choice! Here is your complete travel guide for ${dest.name}, ${dest.country}.`);
    lines.push('');
    lines.push(`Best time to visit: ${dest.bestTime}`);
    lines.push('');

    if (!focus || focus === 'activities') {
        lines.push('Top Activities:');
        dest.activities.forEach((a, i) => lines.push(`${i + 1}. ${a}`));
        lines.push('');
    }

    if (!focus || focus === 'budget') {
        lines.push('Budget Breakdown (per person):');
        lines.push(`  Budget traveler: ${dest.budget.low}`);
        lines.push(`  Mid-range: ${dest.budget.mid}`);
        lines.push(`  Luxury: ${dest.budget.high}`);
        lines.push('');
    }

    if (!focus || focus === 'itinerary') {
        lines.push('4-Day Itinerary:');
        dest.itinerary.forEach(day => lines.push(day));
        lines.push('');
    }

    lines.push('Need more details on accommodation, food, or transport? Just ask!');
    return lines.join('\n');
}

function generateReply(message) {
    const msg = message.toLowerCase().trim()
        .replace(/^(can you|could you|do you|please|i want to|i need to|help me|tell me)\s+/g, '');

    // Greeting
    if (greetings.some(g => msg === g || msg.startsWith(g + ' ') || msg.startsWith(g + '!'))) {
        return 'Hello! I am your AI travel assistant. I can help you plan trips to destinations like Goa, Manali, Kashmir, Jaipur, Shimla, Rishikesh, Dubai, Bali, Paris, and Tokyo.\n\nTry asking:\n- "Plan a trip to Goa"\n- "Budget trip to Manali"\n- "4 day itinerary for Jaipur"\n- "Best beach destinations in India"\n- "Honeymoon trip suggestions"';
    }

    // Hotel / accommodation — checked BEFORE destination match so dest lookup works here too
    if (hotelKeywords.some(k => msg.includes(k))) {
        const dest = matchDestination(msg);
        if (dest) {
            return `Here are accommodation options in ${dest.name}:\n\nBudget: Hostels & guesthouses — ${dest.budget.low}\nMid-range: 3-star hotels — ${dest.budget.mid}\nLuxury: 5-star resorts — ${dest.budget.high}\n\nTip: Book on MakeMyTrip, Goibibo, or Booking.com for best deals.\nWant a full trip plan for ${dest.name}?`;
        }
        const unknownPlace = extractPlaceName(msg);
        if (unknownPlace) return handleUnknownPlace(unknownPlace);
        return 'I can show hotel options for these destinations I know:\n\nIndia: Goa, Manali, Kashmir, Jaipur, Shimla, Rishikesh\nInternational: Dubai, Bali, Paris, Tokyo\n\nFor any other city, check MakeMyTrip.com, Booking.com, OYO Rooms, or Goibibo.com';
    }

    // Direct destination match
    const dest = matchDestination(msg);
    if (dest) {
        let focus = null;
        if (budgetKeywords.some(k => msg.includes(k))) focus = 'budget';
        else if (itineraryKeywords.some(k => msg.includes(k))) focus = 'itinerary';
        else if (activityKeywords.some(k => msg.includes(k))) focus = 'activities';
        return formatDestinationReply(dest, focus);
    }

    // Beach destinations
    if (beachKeywords.some(k => msg.includes(k))) {
        const beachDests = Object.values(destinations).filter(d => ['beach', 'tropical'].includes(d.type));
        return 'Top Beach Destinations for you:\n\n' + beachDests.map((d, i) =>
            `${i + 1}. ${d.name}, ${d.country}\n   Best time: ${d.bestTime}\n   Budget: ${d.budget.low} (budget) | ${d.budget.mid} (mid-range)`
        ).join('\n\n') + '\n\nAsk me to plan a full trip to any of these!';
    }

    // Mountain/hill destinations
    if (mountainKeywords.some(k => msg.includes(k))) {
        const hillDests = Object.values(destinations).filter(d => ['mountain', 'hill', 'nature'].includes(d.type));
        return 'Top Hill & Mountain Destinations:\n\n' + hillDests.map((d, i) =>
            `${i + 1}. ${d.name}, ${d.country}\n   Best time: ${d.bestTime}\n   Budget: ${d.budget.low} (budget) | ${d.budget.mid} (mid-range)`
        ).join('\n\n') + '\n\nAsk me to plan a full trip to any of these!';
    }

    // Adventure
    if (adventureKeywords.some(k => msg.includes(k))) {
        return 'Top Adventure Destinations:\n\n1. Rishikesh, India\n   River rafting, bungee jumping, zip-lining\n   Budget: ₹4,000-7,000\n\n2. Manali, India\n   Paragliding, snow sports, trekking\n   Budget: ₹7,000-10,000\n\n3. Bali, Indonesia\n   Mount Batur trek, surfing, cliff jumping\n   Budget: ₹40,000-55,000\n\nWant a full itinerary for any of these? Just ask!';
    }

    // Romantic / honeymoon
    if (romanticKeywords.some(k => msg.includes(k))) {
        return 'Top Romantic Destinations:\n\n1. Kashmir, India - Houseboat on Dal Lake, Gulmarg snow\n   Budget: ₹20,000-35,000 per couple\n\n2. Goa, India - Beach sunsets, candlelit dinners\n   Budget: ₹15,000-25,000 per couple\n\n3. Bali, Indonesia - Villa stays, temple sunsets\n   Budget: ₹60,000-90,000 per couple\n\n4. Paris, France - Eiffel Tower, Seine cruise\n   Budget: ₹1,20,000-1,80,000 per couple\n\nWant a detailed honeymoon itinerary for any destination?';
    }

    // Family
    if (familyKeywords.some(k => msg.includes(k))) {
        return 'Best Family-Friendly Destinations:\n\n1. Jaipur, India - Forts, palaces, cultural experiences\n   Budget: ₹10,000-18,000 per person\n\n2. Shimla, India - Safe, scenic, snow for kids\n   Budget: ₹10,000-16,000 per person\n\n3. Goa, India - Beaches, water sports, relaxed vibe\n   Budget: ₹15,000-25,000 per person\n\n4. Dubai, UAE - Theme parks, desert safari, malls\n   Budget: ₹55,000-80,000 per person\n\nAsk me for a detailed family itinerary!';
    }

    // Budget travel general
    if (budgetKeywords.some(k => msg.includes(k))) {
        return 'Best Budget Destinations in India:\n\n1. Rishikesh - ₹4,000-7,000 (adventure + spirituality)\n2. Shimla - ₹6,000-9,000 (hills + snow)\n3. Jaipur - ₹5,000-8,000 (culture + history)\n4. Goa - ₹8,000-12,000 (beach + nightlife)\n5. Manali - ₹7,000-10,000 (mountains + adventure)\n\nBudget Tips:\n- Travel in off-season for 30-40% cheaper rates\n- Book trains instead of flights\n- Stay in hostels or guesthouses\n- Eat at local dhabas and street food stalls\n- Book in advance for better deals\n\nWant a detailed budget plan for any destination?';
    }

    // India destinations
    if (msg.includes('india') || msg.includes('indian')) {
        const indiaDests = Object.values(destinations).filter(d => d.country === 'India');
        return 'Top Destinations in India:\n\n' + indiaDests.map((d, i) =>
            `${i + 1}. ${d.name} (${d.type}) - Best time: ${d.bestTime}`
        ).join('\n') + '\n\nAsk me to plan a full trip to any of these!';
    }

    // International
    if (msg.includes('international') || msg.includes('abroad') || msg.includes('foreign') || msg.includes('overseas')) {
        const intlDests = Object.values(destinations).filter(d => d.country !== 'India');
        return 'Top International Destinations:\n\n' + intlDests.map((d, i) =>
            `${i + 1}. ${d.name}, ${d.country}\n   Best time: ${d.bestTime}\n   Budget: ${d.budget.mid} (mid-range)`
        ).join('\n\n') + '\n\nAsk me to plan a full trip to any of these!';
    }

    // General trip planning help
    if (msg.includes('help') || msg.includes('suggest') || msg.includes('recommend') || msg.includes('where')) {
        return 'I can help you plan trips to these destinations:\n\nIndia: Goa, Manali, Kashmir, Jaipur, Shimla, Rishikesh\nInternational: Dubai, Bali, Paris, Tokyo\n\nJust tell me:\n- Where you want to go\n- Your budget range\n- Number of days\n- Travel style (adventure, relaxation, culture, romance)\n\nExample: "Plan a 4 day budget trip to Goa" or "Honeymoon itinerary for Kashmir"';
    }

    // Try to detect any unknown place name before giving up
    const unknownPlace = extractPlaceName(msg);
    if (unknownPlace) return handleUnknownPlace(unknownPlace);

    // Default fallback
    return 'I can help you plan amazing trips! I have detailed guides for:\n\nIndia: Goa, Manali, Kashmir, Jaipur, Shimla, Rishikesh\nInternational: Dubai, Bali, Paris, Tokyo\n\nOr ask about ANY destination — I will give you booking links and travel tips!\n\nTry asking:\n- "Plan a trip to Goa"\n- "Hotels in Amreli"\n- "Trip to Surat"\n- "Budget beach destinations"\n- "Honeymoon trip suggestions"';
}

router.post('/chat', (req, res) => {
    try {
        const { message } = req.body;
        if (!message || !message.trim()) {
            return res.status(400).json({ message: 'Message is required' });
        }
        const reply = generateReply(message.trim());
        res.json({ reply });
    } catch (error) {
        console.error('AI Chat Error:', error);
        res.status(500).json({ message: 'Server Error' });
    }
});

module.exports = router;