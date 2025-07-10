const { createClient } = require('@supabase/supabase-js');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env') });

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Supabase URL or Service Key is missing. Make sure to set them in your supabase/.env file.');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// IMPORTANT: Replace this with a real user ID from your auth.users table
const authorId = 'b621a87a-9a25-46f1-b357-21d5ffc0709d';

const blogPosts = [
  {
    title: "10 Tips for Keeping Your Clothes Looking New",
    excerpt: "Learn how to extend the life of your favorite garments with these expert tips.",
    content: "<p>Content for 10 tips...</p>",
    image_url: "https://res.cloudinary.com/dt3czltxx/image/upload/v1748611411/laundrifica_images/blog/laundry-tips-main_g12kep.jpg",
    category: "Clothing Care",
    read_time_minutes: 5,
    user_id: authorId
  },
  {
    title: "The Environmental Impact of Laundry Detergents",
    excerpt: "Discover eco-friendly alternatives that are better for the planet and your clothes.",
    content: "<p>Content for eco-friendly detergents...</p>",
    image_url: "https://res.cloudinary.com/dt3czltxx/image/upload/v1748611403/laundrifica_images/blog/eco-detergents_fwrd7v.jpg",
    category: "Sustainability",
    read_time_minutes: 7,
    user_id: authorId
  },
  {
    title: "How to Remove Common Stains from Your Clothes",
    excerpt: "A comprehensive guide to tackling everything from coffee to ink stains.",
    content: "<p>Content for stain removal...</p>",
    image_url: "https://res.cloudinary.com/dt3czltxx/image/upload/v1748611418/laundrifica_images/blog/stain-removal-main_m6ojih.jpg",
    category: "Stain Removal",
    read_time_minutes: 8,
    user_id: authorId
  },
  {
    title: "The Science Behind Dry Cleaning",
    excerpt: "Understanding the process and chemicals used in professional dry cleaning.",
    content: "<p>Content for dry cleaning science...</p>",
    image_url: "https://res.cloudinary.com/dt3czltxx/image/upload/v1748611410/laundrifica_images/blog/fabric-care-guide_vxjrtv.jpg",
    category: "Dry Cleaning",
    read_time_minutes: 6,
    user_id: authorId
  },
  {
    title: "Seasonal Laundry Tips: Summer Edition",
    excerpt: "Special care instructions for your summer wardrobe and fabrics.",
    content: "<p>Content for summer laundry tips...</p>",
    image_url: "https://res.cloudinary.com/dt3czltxx/image/upload/v1748611418/laundrifica_images/blog/seasonal-tips_reuxib.jpg",
    category: "Seasonal Tips",
    read_time_minutes: 5,
    user_id: authorId
  },
  {
    title: "The History of Laundry: From Rivers to Machines",
    excerpt: "A fascinating journey through the evolution of laundry practices throughout history.",
    content: "<p>Content for laundry history...</p>",
    image_url: "https://res.cloudinary.com/dt3czltxx/image/upload/v1748611410/laundrifica_images/blog/laundry-history_hrxmiq.jpg",
    category: "History",
    read_time_minutes: 10,
    user_id: authorId
  },
];

async function seedDatabase() {
  if (authorId === 'YOUR_USER_ID_HERE') {
    console.error('Please replace YOUR_USER_ID_HERE with an actual user ID in supabase/seed.js');
    process.exit(1);
  }

  console.log('Seeding database...');
  const { data, error } = await supabase.from('posts').insert(blogPosts);

  if (error) {
    console.error('Error seeding posts:', error);
  } else {
    console.log('Successfully seeded posts!');
  }
}

seedDatabase();
