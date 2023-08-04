require "open-uri"

ApplicationRecord.transaction do
  puts "Destroying tables..."
  # Unnecessary if using `rails db:seed:replant`
  User.destroy_all
  puts "Resetting primary keys..."
  # For easy testing, so that after seeding, the first `User` has `id` of 1
  ApplicationRecord.connection.reset_pk_sequence!('users')
  puts "Creating users..."

  # Create one user with an easy to remember username, email, and password:
  User.create!(
    first_name: 'Demo',
    last_name: 'User',
    email: 'demoUser@gmail.com',
    password: '12345678',
    zip_code: '12345'
  )

  # More users
  10.times do
    User.create!({
      first_name: Faker::Internet.unique.username(specifier: 3),
      last_name: Faker::Internet.unique.username(specifier: 3),
      email: Faker::Internet.unique.email,
      password: '12345678',
      zip_code: '12345'
    })
  end
  puts "done seeding User"
end

Business.destroy_all
puts "Creating businesses..."

ApplicationRecord.connection.reset_pk_sequence!('businesses')

# TODO: attach aws images to the associated restaurants
# Businesses => they are all restaurants
# Italian Restaurants
italian_1 = Business.create!(
  name: 'Da Andrea',
  city: 'New York City',
  state: 'New York',
  address: '35 W 13th St',
  zip_code: '10011',
  latitude: 40.7361918,
  longitude: -73.9958515,
  price_range: '$$',
  phone_number: '2123671979',
  category: 'Italian_Pizza',
  average_rating: 0,
  mon: "11:30 AM - 10:00 PM",
  tue: "11:30 AM - 10:00 PM",
  wed: "11:30 AM - 10:00 PM",
  thu: "11:30 AM - 10:00 PM",
  fri: "11:30 AM - 10:00 PM",
  sat: "11:30 AM - 10:00 PM",
  sun: "11:30 AM - 10:00 PM",
  web_url: "daandreanyc.com",
  health_score: "A",
  delivery: true,
  take_out: true,
  wifi: false,
  reservation: true
)

# italian_1.picture.attach(io: URI.open("https://yep-app-seeds.s3.amazonaws.com/italian_1.jpg"), filename: "italian_1.jpg")
# italian_1.picture.attach(io: URI.open("https://yep-app-seeds.s3.amazonaws.com/italian_1_dish_1.jpg"), filename: "italian_1_dish_1.jpg")
# italian_1.picture.attach(io: URI.open("https://yep-app-seeds.s3.amazonaws.com/italian_1_dish_2.jpg"), filename: "italian_1_dish_2.jpg")

italian_2 = Business.create!(
  name: 'Olio e Più',
  city: 'New York City',
  state: 'New York',
  address: '3 Greenwich Ave',
  zip_code: '10014',
  latitude: 40.7338834,
  longitude: -74.0048117,
  price_range: "$$",
  phone_number: '2122436546',
  category: 'Italian_Pizza',
  average_rating: 0,
  mon: "11:00 AM - 12:00 AM (Next day)",
  tue: "11:00 AM - 12:00 AM (Next day)",
  wed: "11:00 AM - 12:00 AM (Next day)",
  thu: "11:00 AM - 12:00 AM (Next day)",
  fri: "11:00 AM - 12:00 AM (Next day)",
  sat: "10:00 AM - 12:00 AM (Next day)",
  sun: "10:00 AM - 12:00 AM (Next day)",
  web_url: "olioepiu.com",
  health_score: "A",
  delivery: true,
  take_out: true,
  wifi: true,
  reservation: true
)

italian_3 = Business.create!(
  name: 'Rubirosa',
  city: 'New York City',
  state: 'New York',
  address: '235 Mulberry St',
  zip_code: '10012',
  latitude: 40.7218804,
  longitude: -73.9988491,
  price_range: "$$",
  phone_number: '2129650500',
  category: 'Italian_Pizza',
  average_rating: 0,
  mon: "11:00 AM - 11:00 PM",
  tue: "11:00 AM - 11:00 PM",
  wed: "11:00 AM - 11:00 PM",
  thu: "11:00 AM - 11:00 PM",
  fri: "11:00 AM - 11:00 PM",
  sat: "11:00 AM - 11:00 PM",
  sun: "11:00 AM - 11:00 PM",
  web_url: "rubirosanyc.com",
  health_score: "A",
  delivery: true,
  take_out: true,
  wifi: false,
  reservation: true
)

italian_4 = Business.create!(
  name: 'Paesano',
  city: 'New York City',
  state: 'New York',
  address: '136 Mulberry St',
  zip_code: '10013',
  latitude: 40.7185506,
  longitude: -74.0000215,
  price_range: '$$',
  phone_number: '2129651188',
  category: 'Italian',
  average_rating: 0,
  mon: "11:00 AM - 10:00 PM",
  tue: "11:00 AM - 10:00 PM",
  wed: "11:00 AM - 10:00 PM",
  thu: "11:00 AM - 10:00 PM",
  fri: "11:00 AM - 10:30 PM",
  sat: "11:00 AM - 10:30 PM",
  sun: "11:00 AM - 10:00 PM",
  web_url: "paesanosoflittleitaly.com",
  health_score: "A",
  delivery: false,
  take_out: true,
  wifi: false,
  reservation: true
)

italian_5 = Business.create!(
  name: "L'Antica Pizzeria Da Michele NYC",
  city: 'New York City',
  state: 'New York',
  address: '2 Bank St',
  zip_code: '10014',
  latitude: 40.7370199,
  longitude: -74.0041939,
  price_range: '$$$',
  phone_number: '9295246682',
  category: 'Italian_Pizza',
  average_rating: 0,
  mon: "8:00 AM - 3:00 PM, 5:00 PM - 10:00 PM",
  tue: "8:00 AM - 3:00 PM, 5:00 PM - 10:00 PM",
  wed: "8:00 AM - 3:00 PM, 5:00 PM - 10:00 PM",
  thu: "8:00 AM - 3:00 PM, 5:00 PM - 10:00 PM",
  fri: "8:00 AM - 3:00 PM, 5:00 PM - 10:00 PM",
  sat: "8:00 AM - 11:00 PM",
  sun: "9:00 AM - 10:00 PM",
  web_url: "damicheleusa.com/nyc",
  delivery: true,
  take_out: true,
  reservation: true
)

italian_6 = Business.create!(
  name: 'La Lanterna Di Vittorio',
  city: 'New York City',
  state: 'New York',
  address: '129 MacDougal St',
  zip_code: '10012',
  latitude: 40.7306691,
  longitude: -74.0026245,
  price_range: '$$',
  phone_number: '9176393236',
  category: 'Italian_Pizza',
  average_rating: 0,
  mon: "10:00 AM - 1:00 AM (Next day)",
  tue: "10:00 AM - 1:00 AM (Next day)",
  wed: "10:00 AM - 1:00 AM (Next day)",
  thu: "10:00 AM - 1:00 AM (Next day)",
  fri: "10:00 AM - 2:00 AM (Next day)",
  sat: "10:00 AM - 2:00 AM (Next day)",
  sun: "10:00 AM - 1:00 AM (Next day)",
  web_url: "lalanterna.nyc",
  health_score: "A",
  delivery: true,
  take_out: true,
  wifi: true,
  reservation: true
)

italian_7 = Business.create!(
  name: 'Trapizzino',
  city: 'New York City',
  state: 'New York',
  address: '144 Orchard St',
  zip_code: '10002',
  latitude: 40.720413,
  longitude: -73.9992217,
  price_range: '$$',
  phone_number: '3474674362',
  category: 'Italian',
  average_rating: 0,
  mon: "12:00 PM - 9:00 PM",
  tue: "12:00 PM - 10:00 PM",
  wed: "12:00 PM - 10:00 PM",
  thu: "12:00 PM - 10:30 PM",
  fri: "12:00 PM - 12:00 AM (Next day)",
  sat: "11:00 AM - 12:00 AM (Next day)",
  sun: "11:00 AM - 9:30 PM",
  web_url: "trapizzinousa.com",
  health_score: "A",
  delivery: true,
  take_out: true,
  wifi: false,
  reservation: true
)

italian_8 = Business.create!(
  name: 'Babbo',
  city: 'New York City',
  state: 'New York',
  address: '110 Waverly Pl',
  zip_code: '10011',
  latitude: 40.7323,
  longitude: -74.0041494,
  price_range: '$$$$',
  phone_number: '2127770303',
  category: 'Italian',
  average_rating: 0,
  mon: "4:30 PM - 9:00 PM",
  tue: "4:30 PM - 9:00 PM",
  wed: "4:30 PM - 10:00 PM",
  thu: "4:30 PM - 10:00 PM",
  fri: "4:30 PM - 10:30 PM",
  sat: "4:30 PM - 10:30 PM",
  sun: "4:30 PM - 9:00 PM",
  web_url: "babbonyc.com",
  health_score: "A",
  delivery: true,
  take_out: true,
  wifi: false,
  reservation: true
)

italian_9 = Business.create!(
  name: 'Ribalta Pizza',
  city: 'New York City',
  state: 'New York',
  address: '48 E 12th St',
  zip_code: '10003',
  latitude: 40.7332822,
  longitude: -73.9941344,
  price_range: '$$',
  phone_number: '2127777781',
  category: 'Italian_Pizza',
  average_rating: 0,
  mon: "12:00 PM - 11:00 PM",
  tue: "12:00 PM - 11:00 PM",
  wed: "12:00 PM - 11:00 PM",
  thu: "12:00 PM - 11:00 PM",
  fri: "12:00 PM - 12:00 AM (Next day)",
  sat: "12:00 PM - 12:00 AM (Next day)",
  sun: "12:00 PM - 11:00 PM",
  web_url: "ribaltanyc.com",
  delivery: true,
  take_out: true,
  wifi: true,
  reservation: true
)

italian_10 = Business.create!(
  name: "Lil Frankie's",
  city: 'New York City',
  state: 'New York',
  address: '19 1st Ave',
  zip_code: '10003',
  latitude: 40.7236504,
  longitude: -73.9910543,
  price_range: '$$',
  phone_number: '2124204900',
  category: 'Italian_Pizza',
  average_rating: 0,
  mon: "11:00 AM - 2:00 AM (Next day)",
  tue: "11:00 AM - 2:00 AM (Next day)",
  wed: "11:00 AM - 2:00 AM (Next day)",
  thu: "11:00 AM - 2:00 AM (Next day)",
  fri: "11:00 PM - 4:00 AM (Next day)",
  sat: "11:00 PM - 4:00 AM (Next day)",
  sun: "11:00 PM - 2:00 AM (Next day)",
  web_url: "lilfrankies.com",
  delivery: true,
  take_out: true,
  wifi: false,
  reservation: true
)

italian_11 = Business.create!(
  name: "Joe's Pizza",
  city: 'New York City',
  state: 'New York',
  address: '150 E 14th St',
  zip_code: '10003',
  latitude: 40.7332402,
  longitude: -73.9902601,
  price_range: '$',
  phone_number: '2123889474',
  category: 'Italian_Pizza',
  average_rating: 0,
  mon: "10:00 AM - 4:00 AM (Next day)",
  tue: "10:00 AM - 4:00 AM (Next day)",
  wed: "10:00 AM - 4:00 AM (Next day)",
  thu: "10:00 AM - 4:00 AM (Next day)",
  fri: "10:00 AM - 5:00 AM (Next day)",
  sat: "10:00 AM - 5:00 AM (Next day)",
  sun: "10:00 AM - 5:00 AM (Next day)",
  web_url: "joespizzanyc.com",
  health_score: "A",
  delivery: true,
  take_out: true,
  wifi: false,
  reservation: false
)

# Chinese Restaurants
chinese_1 = Business.create!(
  name: "Xu's Public House",
  city: 'New York City',
  state: 'New York',
  address: '15 Union Square W',
  zip_code: '10003',
  latitude: 40.7358974,
  longitude: -73.9942782,
  price_range: '$$$',
  phone_number: '2129019971',
  category: 'Chinese',
  average_rating: 0,
  mon: "11:00 AM - 10:00 PM",
  tue: "11:00 AM - 10:00 PM",
  wed: "11:00 AM - 10:00 PM",
  thu: "11:00 AM - 10:00 PM",
  fri: "11:00 AM - 10:00 PM",
  sat: "11:00 AM - 10:00 PM",
  sun: "11:00 AM - 10:00 PM",
  web_url: "xupublic.com",
  health_score: "A",
  delivery: true,
  take_out: true,
  wifi: true,
  reservation: false
)

chinese_2 = Business.create!(
  name: 'Shu Jiao Fu Zhou',
  city: 'New York City',
  state: 'New York',
  address: '295 Grand St',
  zip_code: '10002',
  latitude: 40.7174149,
  longitude: -73.9946625,
  price_range: '$',
  phone_number: '2126252532',
  category: 'Chinese',
  average_rating: 0,
  mon: "8:30 AM - 8:00 PM",
  tue: "8:30 AM - 8:00 PM",
  wed: "8:30 AM - 8:00 PM",
  thu: "8:30 AM - 8:00 PM",
  fri: "8:30 AM - 8:00 PM",
  sat: "8:30 AM - 8:00 PM",
  sun: "8:30 AM - 8:00 PM",
  web_url: "N/A",
  delivery: true,
  take_out: true,
  wifi: false,
  reservation: false
)

chinese_3 = Business.create!(
  name: 'Chow House',
  city: 'New York City',
  state: 'New York',
  address: '181 Bleecker St',
  zip_code: '10012',
  latitude: 40.7290686,
  longitude: -74.003301,
  price_range: '$$',
  phone_number: '2128371021',
  category: 'Chinese',
  average_rating: 0,
  mon: "11:00 AM - 10:00 PM",
  tue: "11:00 AM - 10:00 PM",
  wed: "11:00 AM - 10:00 PM",
  thu: "11:00 AM - 10:00 PM",
  fri: "11:00 AM - 10:30 PM",
  sat: "12:00 PM - 10:30 PM",
  sun: "12:00 PM - 10:00 PM",
  web_url: "chowhousenyc.com",
  health_score: "33.0",
  delivery: true,
  take_out: true,
  wifi: true,
  reservation: true
)

chinses_4 = Business.create!(
  name: "Joe's Shanghai",
  city: 'New York City',
  state: 'New York',
  address: '46 Bowery St',
  zip_code: '10013',
  latitude: 40.7156696,
  longitude: -73.9992737,
  price_range: '$$',
  phone_number: '2122338888',
  category: 'Chinese',
  average_rating: 0,
  mon: "11:00 AM - 10:00 PM",
  tue: "11:00 AM - 10:00 PM",
  wed: "11:00 AM - 10:00 PM",
  thu: "11:00 AM - 10:00 PM",
  fri: "11:00 AM - 10:00 PM",
  sat: "11:00 PM - 10:00 PM",
  sun: "11:00 PM - 10:00 PM",
  web_url: "joeshanghairestaurants.com",
  health_score: "A",
  delivery: true,
  take_out: true,
  wifi: false,
  reservation: false
)

chinses_5 = Business.create!(
  name: 'Han Dynasty',
  city: 'New York City',
  state: 'New York',
  address: '90 3rd Ave',
  zip_code: '10003',
  latitude: 40.7322346,
  longitude: -73.9931225,
  price_range: '$$',
  phone_number: '2123908685',
  category: 'Chinese',
  average_rating: 0,
  mon: "11:30 AM - 10:00 PM",
  tue: "11:30 AM - 10:00 PM",
  wed: "11:30 AM - 10:00 PM",
  thu: "11:30 AM - 10:00 PM",
  fri: "11:30 AM - 11:00 PM",
  sat: "11:30 AM - 11:00 PM",
  sun: "11:30 AM - 10:00 PM",
  web_url: "handynasty.net",
  health_score: "C",
  delivery: true,
  take_out: true,
  wifi: false,
  reservation: true
)

# French Restaurants
french_1 = Business.create!(
  name: 'Amélie',
  city: 'New York City',
  state: 'New York',
  address: '22 W 8th St',
  zip_code: '10011',
  latitude: 40.732633,
  longitude: -74.0002429,
  price_range: '$$$',
  phone_number: '2125332962',
  category: 'French',
  average_rating: 0,
  mon: "4:00 PM - 11:00 PM",
  tue: "12:00 PM - 11:00 PM",
  wed: "12:00 PM - 11:00 PM",
  thu: "12:00 PM - 11:00 PM",
  fri: "12:00 PM - 12:00 AM (Next day)",
  sat: "12:00 PM - 12:00 AM (Next day)",
  sun: "12:00 PM - 11:00 PM",
  web_url: "ameliewinebar.com",
  delivery: true,
  take_out: true,
  wifi: false,
  reservation: true
)

french_2 = Business.create!(
  name: 'La Sirene',
  city: 'New York City',
  state: 'New York',
  address: '558 Broome St',
  zip_code: '10013',
  latitude: 40.724547,
  longitude: 74.0082419,
  price_range: '$$$',
  phone_number: '2129253061',
  category: 'French',
  average_rating: 0,
  mon: "4:00 PM - 10:30 PM",
  tue: "4:00 PM - 10:30 PM",
  wed: "4:00 PM - 10:30 PM",
  thu: "4:00 PM - 10:30 PM",
  fri: "4:00 PM - 11:00 PM",
  sat: "4:00 PM - 11:00 PM",
  sun: "4:00 PM - 10:30 PM",
  web_url: "lasirenenyc.com",
  delivery: true,
  take_out: true,
  wifi: true,
  reservation: true
)

french_3 = Business.create!(
  name: 'Claudette',
  city: 'New York City',
  state: 'New York',
  address: '24 5th Ave',
  zip_code: '10011',
  latitude: 40.7330653,
  longitude: -73.9985695,
  price_range: '$$$',
  phone_number: '2128682424',
  category: 'French',
  average_rating: 0,
  mon: "11:30 AM - 3:00 PM, 5:00 PM - 10:00 PM",
  tue: "11:30 AM - 3:00 PM, 5:00 PM - 10:00 PM",
  wed: "11:30 AM - 3:00 PM, 5:00 PM - 10:00 PM",
  thu: "11:30 AM - 3:00 PM, 5:00 PM - 11:00 PM",
  fri: "11:30 AM - 3:00 PM, 5:00 PM - 11:00 PM",
  sat: "10:00 AM - 3:00 PM, 5:00 PM - 11:00 PM",
  sun: "10:00 AM - 3:00 PM, 5:00 PM - 10:00 PM",
  web_url: "claudettenyc.com",
  delivery: true,
  take_out: true,
  wifi: true,
  reservation: true
)

french_4 = Business.create!(
  name: 'Boucherie Union Square',
  city: 'New York City',
  state: 'New York',
  address: '225 Park Ave S',
  zip_code: '10003',
  latitude: 40.7372592,
  longitude: 73.9907995,
  price_range: '$$$',
  phone_number: '2123530200',
  category: 'French',
  average_rating: 0,
  mon: "11:00 AM - 12:00 AM (Next day)",
  tue: "11:00 AM - 12:00 AM (Next day)",
  wed: "11:00 AM - 12:00 AM (Next day)",
  thu: "11:00 AM - 12:00 AM (Next day)",
  fri: "11:00 AM - 12:00 AM (Next day)",
  sat: "10:00 AM - 12:00 AM (Next day)",
  sun: "10:00 AM - 12:00 AM (Next day)",
  web_url: "boucherieus.com",
  health_score: "A",
  delivery: true,
  take_out: true,
  wifi: true,
  reservation: true
)

french_5 = Business.create!(
  name: 'Buvette',
  city: 'New York City',
  state: 'New York',
  address: '42 Grove St',
  zip_code: '10014',
  latitude: 40.7326299,
  longitude: -74.0069033,
  price_range: '$$',
  phone_number: '2122553590',
  category: 'French',
  average_rating: 0,
  mon: "8:00 AM - 12:00 AM (Next day)",
  tue: "8:00 AM - 12:00 AM (Next day)",
  wed: "8:00 AM - 12:00 AM (Next day)",
  thu: "8:00 AM - 12:00 AM (Next day)",
  fri: "8:00 AM - 12:00 AM (Next day)",
  sat: "8:00 AM - 12:00 AM (Next day)",
  sun: "8:00 AM - 12:00 AM (Next day)",
  web_url: "ilovebuvette.com",
  health_score: "A",
  delivery: true,
  take_out: true,
  wifi: false,
  reservation: false
)

french_6 = Business.create!(
  name: 'Mino Brasserie',
  city: 'New York City',
  state: 'New York',
  address: '225 W 12th St',
  zip_code: '10011',
  latitude: 40.7377978,
  longitude: -74.0041992,
  price_range: '$$$',
  phone_number: '8455249006',
  category: 'French',
  average_rating: 0,
  mon: "Closed",
  tue: "4:30 PM - 11:00 PM",
  wed: "4:30 PM - 11:00 PM",
  thu: "4:30 PM - 11:00 PM",
  fri: "4:30 PM - 11:00 PM",
  sat: "11:30 AM - 12:00 AM (Next day)",
  sun: "11:30 AM - 11:00 PM",
  web_url: "minobrasserie.com",
  delivery: true,
  take_out: true,
  wifi: true,
  reservation: true
)

# Japanese Restaurants
japanese_1 = Business.create!(
  name: 'Benemon',
  city: 'New York City',
  state: 'New York',
  address: '108 E 4th St',
  zip_code: '10003',
  latitude: 40.7255424,
  longitude: -73.9909319,
  price_range: '$$',
  phone_number: '2126143006',
  category: 'Japanese',
  average_rating: 0,
  mon: "Closed",
  tue: "5:00 PM - 11:00 PM",
  wed: "5:00 PM - 11:00 PM",
  thu: "5:00 PM - 11:00 PM",
  fri: "5:00 PM - 11:00 PM",
  sat: "5:00 PM - 11:00 PM",
  sun: "5:00 PM - 10:00 PM",
  web_url: "benemon.weeblyte.com",
  delivery: true,
  take_out: true,
  wifi: false,
  reservation: false
)

japanese_2 = Business.create!(
  name: 'Tsuru Ton Tan',
  city: 'New York City',
  state: 'New York',
  address: '21 E 16th St',
  zip_code: '10003',
  latitude: 40.7368765,
  longitude: -73.9938438,
  price_range: '$$',
  phone_number: '2129891000',
  category: 'Japanese_Ramen',
  average_rating: 0,
  mon: "12:00 PM - 9:30 PM",
  tue: "12:00 PM - 9:30 PM",
  wed: "12:00 PM - 9:30 PM",
  thu: "12:00 PM - 10:00 PM",
  fri: "12:00 PM - 10:00 PM",
  sat: "12:00 PM - 10:00 PM",
  sun: "12:00 PM - 9:30 PM",
  web_url: "tsurutontan.com",
  health_score: "C",
  delivery: true,
  take_out: true,
  wifi: false,
  reservation: true
)

japanese_3 = Business.create!(
  name: 'Raku',
  city: 'New York City',
  state: 'New York',
  address: '342 E 6th St',
  zip_code: '10003',
  latitude: 40.7264931,
  longitude: -73.9892508,
  price_range: '$$',
  phone_number: '2122281324',
  category: 'Japanese_Ramen',
  average_rating: 0,
  mon: "Closed",
  tue: "12:00 PM - 9:30 PM",
  wed: "12:00 PM - 9:30 PM",
  thu: "12:00 PM - 9:30 PM",
  fri: "12:00 PM - 9:30 PM",
  sat: "12:00 PM - 9:30 PM",
  sun: "12:00 PM - 9:30 PM",
  web_url: "rakunyc.com",
  health_score: "32.0",
  delivery: true,
  take_out: true,
  wifi: false,
  reservation: false
)

japanese_4 = Business.create!(
  name: 'Maison Kintaro',
  city: 'New York City',
  state: 'New York',
  address: '401 W 24th St',
  zip_code: '10011',
  latitude: 40.747434,
  longitude: -74.0038072,
  price_range: '$$',
  phone_number: '3152304533',
  category: 'Japanese',
  average_rating: 0,
  mon: "Closed",
  tue: "12:00 PM - 3:30 PM, 5:00 PM - 9:30 PM",
  wed: "12:00 PM - 3:30 PM, 5:00 PM - 9:30 PM",
  thu: "12:00 PM - 3:30 PM, 5:00 PM - 9:30 PM",
  fri: "12:00 PM - 3:30 PM, 5:00 PM - 9:30 PM",
  sat: "12:00 PM - 3:30 PM, 5:00 PM - 9:30 PM",
  sun: "12:00 PM - 8:00 PM",
  web_url: "maisonkintaro.com"
)

japanese_5 = Business.create!(
  name: 'Maki Kosaka',
  city: 'New York City',
  state: 'New York',
  address: '55 W 19 St',
  zip_code: '10011',
  latitude: 40.7402961,
  longitude: -73.9963973,
  price_range: '$$',
  phone_number: '9172615538',
  category: 'Japanese_Sushi',
  average_rating: 0,
  mon: "Closed",
  tue: "5:00 PM - 9:30 PM",
  wed: "5:00 PM - 9:30 PM",
  thu: "5:00 PM - 9:30 PM",
  fri: "5:00 PM - 9:30 PM",
  sat: "12:00 PM - 2:30 PM, 5:00 PM - 9:30 PM",
  sun: "12:00 PM - 2:30 PM, 5:00 PM - 9:30 PM",
  web_url: "makikosaka.com",
  delivery: true,
  take_out: true,
  wifi: false,
  reservation: true
)

japanese_6 = Business.create!(
  name: 'Ootoya Chelsea',
  city: 'New York City',
  state: 'New York',
  address: '8 W 18th St',
  zip_code: '10011',
  latitude: 40.7387528,
  longitude: -73.9953542,
  price_range: '$$',
  phone_number: '2122550018',
  category: 'Japanese_Sushi',
  average_rating: 0,
  mon: "Closed",
  tue: "11:30 AM - 3:00 PM, 5:30 PM - 9:30 PM",
  wed: "11:30 AM - 3:00 PM, 5:30 PM - 9:30 PM",
  thu: "11:30 AM - 3:00 PM, 5:30 PM - 9:30 PM",
  fri: "11:30 AM - 3:00 PM, 5:30 PM - 10:00 PM",
  sat: "11:30 PM - 3:00 PM, 5:30 PM - 10:00 PM",
  sun: "11:30 PM - 3:00 PM, 5:30 PM - 9:30 PM",
  web_url: "ootoya.us",
  delivery: true,
  take_out: true,
  wifi: true,
  reservation: true
)

japenese_7 = Business.create!(
  name: 'Ippudo NY',
  city: 'New York City',
  state: 'New York',
  address: '65 4th Ave',
  zip_code: '10003',
  latitude: 40.730952,
  longitude: -73.9928619,
  price_range: '$$',
  phone_number: '2123880088',
  category: 'Japanese_Ramen',
  average_rating: 0,
  mon: "11:30 AM - 10:30 PM",
  tue: "11:30 AM - 10:30 PM",
  wed: "11:30 AM - 10:30 PM",
  thu: "11:30 AM - 10:30 PM",
  fri: "11:30 AM - 11:30 PM",
  sat: "11:30 AM - 11:30 PM",
  sun: "11:30 AM - 10:30 PM",
  web_url: "ippudony.com",
  health_score: "A",
  delivery: true,
  take_out: true,
  wifi: false,
  reservation: true 
)

japanese_8 = Business.create!(
  name: 'Oramen',
  city: 'New York City',
  state: 'New York',
  address: '579 6th Ave',
  zip_code: '10011',
  latitude: 40.7390167,
  longitude: -73.9985751,
  price_range: '$$',
  phone_number: '6469985754',
  category: 'Japanese_Ramen',
  average_rating: 0,
  mon: "11:30 AM - 9:30 PM",
  tue: "11:30 AM - 9:30 PM",
  wed: "11:30 AM - 9:30 PM",
  thu: "11:30 AM - 9:30 PM",
  fri: "11:30 AM - 9:30 PM",
  sat: "11:30 AM - 9:30 PM",
  sun: "11:30 AM - 9:30 PM",
  web_url: "oramenchelsea.com",
  health_score: "A",
  delivery: true,
  take_out: true,
  wifi: false,
  reservation: true
)

japanese_9 = Business.create!(
  name: 'Kyuramen',
  city: 'New York City',
  state: 'New York',
  address: '210 E 14th St',
  zip_code: '10003',
  latitude: 40.7328248,
  longitude: -73.9893834,
  price_range: '$$',
  phone_number: '3477050847',
  category: 'Japanese_Ramen',
  average_rating: 0,
  mon: "11:00 AM - 1:00 AM (Next day)",
  tue: "11:00 AM - 1:00 AM (Next day)",
  wed: "11:00 AM - 1:00 AM (Next day)",
  thu: "11:00 AM - 1:00 AM (Next day)",
  fri: "11:00 AM - 1:00 AM (Next day)",
  sat: "11:00 AM - 1:00 AM (Next day)",
  sun: "11:00 AM - 1:00 AM (Next day)",
  web_url: "kyuramen.com",
  delivery: true,
  take_out: true,
  wifi: true,
  reservation: true
)

japanese_10 = Business.create!(
  name: 'MIkado',
  city: 'New York City',
  state: 'New York',
  address: '109 W 14th St',
  zip_code: '10011',
  latitude: 40.7377777,
  longitude: -73.9999869,
  price_range: '$$',
  phone_number: '2122559981',
  category: 'Japanese_Sushi',
  average_rating: 0,
  mon: "Not available",
  tue: "Not available",
  wed: "Not available",
  thu: "Not available",
  fri: "Not available",
  sat: "Not available",
  sun: "Not available",
  web_url: "newmikadonyc.com",
  health_score: "A",
  delivery: true,
  take_out: true,
  wifi: true
)

japanese_11 = Business.create!(
  name: 'Sushi Nakazawa',
  city: 'New York City',
  state: 'New York',
  address: '23 Commerce St',
  zip_code: '10011',
  latitude: 40.7318086,
  longitude: -74.0071242,
  price_range: '$$$$',
  phone_number: '2129242212',
  category: 'Japanese_Sushi',
  average_rating: 0,
  mon: "11:45 AM - 2:00 PM, 5:00 PM - 10:00 PM",
  tue: "11:45 AM - 2:00 PM, 5:00 PM - 10:00 PM",
  wed: "11:45 AM - 2:00 PM, 5:00 PM - 10:00 PM",
  thu: "11:45 AM - 2:00 PM, 5:00 PM - 10:00 PM",
  fri: "11:45 AM - 2:00 PM, 5:00 PM - 10:00 PM",
  sat: "11:45 AM - 2:00 PM, 5:00 PM - 10:00 PM",
  sun: "11:45 AM - 2:00 PM, 5:00 PM - 10:00 PM",
  web_url: "sushinakazawa.com",
  health_score: "A",
  delivery: false,
  take_out: false,
  wifi: false,
  reservation: true
)

# Thai Restaurants
thai_1 = Business.create!(
  name: 'Pranakhon Thai Restaurant',
  city: 'New York City',
  state: 'New York',
  address: '88 University Pl',
  zip_code: '10003',
  latitude: 40.733755,
  longitude: -73.9958372,
  price_range: '$$',
  phone_number: '2127866789',
  category: 'Thai',
  average_rating: 0,
  mon: "11:30 AM - 3:15 PM, 4:30 PM - 10:00 PM",
  tue: "11:30 AM - 3:15 PM, 4:30 PM - 10:00 PM",
  wed: "11:30 AM - 3:15 PM, 4:30 PM - 10:00 PM",
  thu: "11:30 AM - 3:15 PM, 4:30 PM - 10:00 PM",
  fri: "11:30 AM - 3:15 PM, 4:30 PM - 10:30 PM",
  sat: "11:30 AM - 3:15 PM, 4:30 PM - 10:30 PM",
  sun: "11:30 AM - 3:15 PM, 4:30 PM - 10:00 PM",
  web_url: "pranakhonnyc.com",
  health_score: "A",
  delivery: true,
  take_out: true,
  wifi: true,
  reservation: true
)

thai_2 = Business.create!(
  name: 'Thai Villa',
  city: 'New York City',
  state: 'New York',
  address: '5 E 19th St G Floor',
  zip_code: '10003',
  latitude: 40.7390085,
  longitude: -73.9955413,
  price_range: '$$',
  phone_number: '2128029999',
  category: 'Thai',
  average_rating: 0,
  mon: "11:30 AM - 3:15 PM, 4:30 PM - 10:15 PM",
  tue: "11:30 AM - 3:15 PM, 4:30 PM - 10:15 PM",
  wed: "11:30 AM - 3:15 PM, 4:30 PM - 10:15 PM",
  thu: "11:30 AM - 3:15 PM, 4:30 PM - 10:15 PM",
  fri: "11:30 AM - 3:15 PM, 4:30 PM - 10:30 PM",
  sat: "11:30 AM - 3:15 PM, 4:30 PM - 10:30 PM",
  sun: "11:30 AM - 3:15 PM, 4:30 PM - 10:15 PM",
  web_url: "thaivillanyc.com",
  health_score: "A",
  delivery: true,
  take_out: true,
  wifi: true,
  reservation: true
)

thai_3 = Business.create!(
  name: 'Soothr',
  city: 'New York City',
  state: 'New York',
  address: '204 E 13th St',
  zip_code: '10003',
  latitude: 40.7323057,
  longitude: -73.9899166,
  price_range: '$$',
  phone_number: '2128449789',
  category: 'Thai',
  average_rating: 0,
  mon: "12:00 PM - 4:00 PM, 5:00 PM - 10:30 PM",
  tue: "12:00 PM - 4:00 PM, 5:00 PM - 10:30 PM",
  wed: "12:00 PM - 4:00 PM, 5:00 PM - 10:30 PM",
  thu: "12:00 PM - 4:00 PM, 5:00 PM - 10:30 PM",
  fri: "12:00 PM - 4:00 PM, 5:00 PM - 11:30 PM",
  sat: "12:00 PM - 4:00 PM, 5:00 PM - 11:30 PM",
  sun: "12:00 PM - 4:00 PM, 5:00 PM - 10:30 PM",
  web_url: "soothrnyc.com",
  health_score: "A",
  delivery: true,
  take_out: true,
  wifi: false,
  reservation: true
)

thai_4 = Business.create!(
  name: 'LoveMama',
  city: 'New York City',
  state: 'New York',
  address: '174 2nd Ave',
  zip_code: '10003',
  latitude: 40.7303899,
  longitude: -73.9886362,
  price_range: '$$',
  phone_number: '2122545370',
  category: 'Thai',
  average_rating: 0,
  mon: "11:30 AM - 11:00 PM",
  tue: "11:30 AM - 11:00 PM",
  wed: "11:30 AM - 11:00 PM",
  thu: "11:30 AM - 11:00 PM",
  fri: "11:30 AM - 11:00 PM",
  sat: "11:30 AM - 11:00 PM",
  sun: "11:30 AM - 11:00 PM",
  web_url: "lovemamanyc.com",
  health_score: "A",
  delivery: true,
  take_out: true,
  wifi: true,
  reservation: true
)

thai_5 = Business.create!(
  name: 'Top Thai Vintage',
  city: 'New York City',
  state: 'New York',
  address: '55 Carmine St',
  zip_code: '10014',
  latitude: 40.7299526,
  longitude: -74.0068115,
  price_range: '$$',
  phone_number: '6466092272',
  category: 'Thai',
  average_rating: 0,
  mon: "11:30 AM - 3:30 PM, 4:30 PM - 9:00 PM",
  tue: "11:30 AM - 3:30 PM, 4:30 PM - 9:00 PM",
  wed: "11:30 AM - 3:30 PM, 4:30 PM - 9:00 PM",
  thu: "11:30 AM - 3:30 PM, 4:30 PM - 9:00 PM",
  fri: "11:30 AM - 3:30 PM, 4:30 PM - 10:00 PM",
  sat: "11:30 AM - 3:30 PM, 4:30 PM - 10:00 PM",
  sun: "11:30 AM - 3:30 PM, 4:30 PM - 9:00 PM",
  web_url: "topthaivintage.com",
  health_score: "A",
  delivery: true,
  take_out: true,
  wifi: false,
  reservation: true
)

thai_6 = Business.create!(
  name: 'Top Thai Greenwich',
  city: 'New York City',
  state: 'New York',
  address: '235 Sullivan St',
  zip_code: '10012',
  latitude: 40.7297885,
  longitude: -74.0020226,
  price_range: '$$',
  phone_number: '6467264418',
  category: 'Thai',
  average_rating: 0,
  mon: "11:00 AM - 3:00 PM, 4:30 PM - 10:00 PM",
  tue: "11:00 AM - 3:00 PM, 4:30 PM - 10:00 PM",
  wed: "11:00 AM - 3:00 PM, 4:30 PM - 10:00 PM",
  thu: "11:00 AM - 3:00 PM, 4:30 PM - 10:00 PM",
  fri: "11:00 AM - 3:00 PM, 4:30 PM - 11:00 PM",
  sat: "11:00 AM - 3:00 PM, 4:30 PM - 11:00 PM",
  sun: "11:00 AM - 3:00 PM, 4:30 PM - 10:00 PM",
  web_url: "topthainyc.com",
  delivery: true,
  take_out: true,
  wifi: false,
  reservation: true
)

thai_7 = Business.create!(
  name: 'Laut',
  city: 'New York City',
  state: 'New York',
  address: '15 E 17th St',
  zip_code: '10003',
  latitude: 40.7375843,
  longitude: -73.9958627,
  price_range: '$$',
  phone_number: '2122068989',
  category: 'Thai',
  average_rating: 0,
  mon: "11:30 AM - 3:30 PM, 5:00 PM - 10:00 PM",
  tue: "11:30 AM - 3:15 PM, 5:00 PM - 10:00 PM",
  wed: "11:30 AM - 3:15 PM, 5:00 PM - 10:00 PM",
  thu: "11:30 AM - 3:15 PM, 5:00 PM - 10:00 PM",
  fri: "11:30 AM - 3:15 PM, 5:00 PM - 10:30 PM",
  sat: "1:00 PM - 10:00 PM",
  sun: "1:00 PM - 10:00 PM",
  web_url: "lautnyc.com",
  delivery: true,
  take_out: true,
  wifi: false,
  reservation: true
)

# Mexican Restaurants
mexican_1 = Business.create!(
  name: 'La Contenta Oeste',
  city: 'New York City',
  state: 'New York',
  address: '78 W 11th St',
  zip_code: '10011',
  latitude: 40.7352091,
  longitude: -74.0030297,
  price_range: '$$',
  phone_number: '2125332233',
  category: 'Mexican',
  average_rating: 0,
  mon: "3:00 PM - 10:00 PM",
  tue: "3:00 PM - 10:00 PM",
  wed: "3:00 PM - 10:00 PM",
  thu: "12:00 PM - 10:00 PM",
  fri: "12:00 PM - 11:00 PM",
  sat: "12:00 PM - 11:00 PM",
  sun: "12:00 PM - 10:00 PM",
  web_url: "lacontentanyc.com",
  health_score: "20.0",
  delivery: true,
  take_out: true,
  wifi: true,
  reservation: true
)

mexican_2 = Business.create!(
  name: 'La Contenta',
  city: 'New York City',
  state: 'New York',
  address: '102 Norfolk St',
  zip_code: '10002',
  latitude: 40.718774,
  longitude: -73.9896442,
  price_range: '$$',
  phone_number: '2124324180',
  category: 'Mexican',
  average_rating: 0,
  mon: "3:00 PM - 12:00 AM (Next day)",
  tue: "3:00 PM - 12:00 AM (Next day)",
  wed: "3:00 PM - 12:00 AM (Next day)",
  thu: "12:00 PM - 2:00 AM (Next day)",
  fri: "12:00 PM - 2:00 AM (Next day)",
  sat: "12:00 PM - 2:00 AM (Next day)",
  sun: "12:00 PM - 11:00 PM",
  web_url: "lacontentanyc.com",
  health_score: "A",
  delivery: true,
  take_out: true,
  wifi: true,
  reservation: true
)

mexican_3 = Business.create!(
  name: 'Rosa Mexicano',
  city: 'New York City',
  state: 'New York',
  address: '9 E 18th St',
  zip_code: '10003',
  latitude: 40.7383106,
  longitude: -73.9933895,
  price_range: '$$',
  phone_number: '2125333350',
  category: 'Mexican',
  average_rating: 0,
  mon: "11:30 AM - 11:00 PM",
  tue: "11:30 AM - 11:00 PM",
  wed: "11:30 AM - 11:00 PM",
  thu: "11:30 AM - 12:00 AM (Next day)",
  fri: "11:30 AM - 12:00 AM (Next day)",
  sat: "11:30 AM - 12:00 AM (Next day)",
  sun: "11:00 AM - 11:00 PM",
  web_url: "rosamexicano.com",
  health_score: "19.0",
  delivery: true,
  take_out: true,
  wifi: true,
  reservation: true
)

mexican_4 = Business.create!(
  name: 'Tortaria',
  city: 'New York City',
  state: 'New York',
  address: '94 University Pl',
  zip_code: '10003',
  latitude: 40.733874,
  longitude: -73.9956149,
  price_range: '$$',
  phone_number: '2127761830',
  category: 'Mexican',
  average_rating: 0,
  mon: "12:00 PM - 11:00 PM",
  tue: "12:00 PM - 11:00 PM",
  wed: "12:00 PM - 11:00 PM",
  thu: "12:00 PM - 11:00 PM",
  fri: "12:00 PM - 11:00 PM",
  sat: "11:00 AM - 11.00 PM",
  sun: "11:00 AM - 11:00 PM",
  web_url: "tortaria-nyc.com",
  health_score: "A",
  delivery: true,
  take_out: true,
  wifi: false,
  reservation: false
)

mexican_5 = Business.create!(
  name: 'El Cantinero',
  city: 'New York City',
  state: 'New York',
  address: '86 University Pl',
  zip_code: '10003',
  latitude: 40.7336756,
  longitude: -73.998169,
  price_range: '$$',
  phone_number: '2122559378',
  category: 'Mexican',
  average_rating: 0,
  mon: "11:30 AM - 1:00 AM (Next day)",
  tue: "11:30 AM - 1:00 AM (Next day)",
  wed: "11:30 AM - 1:00 AM (Next day)",
  thu: "11:30 AM - 1:00 AM (Next day)",
  fri: "11:30 AM - 1:00 AM (Next day)",
  sat: "11:30 AM - 4:00 AM (Next day)",
  sun: "11:30 AM - 4:00 AM (Next day)",
  web_url: "elcantineronyc.com",
  health_score: "38.0",
  delivery: true,
  take_out: true,
  wifi: false,
  reservation: true
)

# Milk Tea Stores
milk_tea_1 = Business.create!(
  name: 'Wanpo Tea Shop',
  city: 'New York City',
  state: 'New York',
  address: '37 E 8th St',
  zip_code: '10003',
  latitude: 40.7315429,
  longitude: -73.9967351,
  price_range: '$$',
  phone_number: '2129958349',
  category: 'Milk Tea',
  average_rating: 0,
  mon: "12:00 PM - 8:00 PM (Next day)",
  tue: "12:00 PM - 8:00 PM (Next day)",
  wed: "12:00 PM - 8:00 PM (Next day)",
  thu: "12:00 PM - 8:00 PM (Next day)",
  fri: "12:00 PM - 8:00 PM (Next day)",
  sat: "11:30 AM - 4:00 AM (Next day)",
  sun: "11:30 AM - 4:00 AM (Next day)",
  web_url: "wanpotea.us",
  health_score: "18.0",
  delivery: true,
  take_out: true
)

milk_tea_2 = Business.create!(
  name: 'Teazzi Tea Shop',
  city: 'New York City',
  state: 'New York',
  address: '47 W 14th St Ste 3',
  zip_code: '10011',
  latitude: 40.7372586,
  longitude: -73.9982954,
  price_range: '$',
  phone_number: '9172681999',
  category: 'Milk Tea',
  average_rating: 0,
  mon: "11:00 PM - 8:00 PM",
  tue: "11:00 PM - 8:00 PM",
  wed: "11:00 PM - 8:00 PM",
  thu: "11:00 AM - 8:00 PM",
  fri: "11:00 AM - 9:00 PM",
  sat: "11:00 AM - 9:00 PM",
  sun: "11:00 AM - 8:00 PM",
  web_url: "teazzi.com",
  health_score: "A",
  wifi: true,
  delivery: true,
  take_out: true
)

milk_tea_3 = Business.create!(
  name: 'Jooy Tea Shoppe',
  city: 'New York City',
  state: 'New York',
  address: '7 E 14th St',
  zip_code: '10003',
  latitude: 40.735799,
  longitude: -73.9950816,
  price_range: '$',
  phone_number: '2123816193',
  category: 'Milk Tea',
  average_rating: 0,
  mon: "11:00 PM - 8:00 PM",
  tue: "11:00 PM - 8:00 PM",
  wed: "11:00 PM - 8:00 PM",
  thu: "11:00 AM - 8:00 PM",
  fri: "11:00 AM - 9:00 PM",
  sat: "11:00 AM - 9:00 PM",
  sun: "11:00 AM - 9:00 PM",  
  web_url: "N/A",
  health_score: "A",
  delivery: true,
  take_out: true
)

milk_tea_4 = Business.create!(
  name: 'ViVi Bubble Tea',
  city: 'New York City',
  state: 'New York',
  address: '18 W 14th St',
  zip_code: '10011',
  latitude: 40.7363399,
  longitude: -73.9973951,
  price_range: '$',
  phone_number: '6466827784',
  category: 'Milk Tea',
  average_rating: 0,
  mon: "11:00 PM - 9:00 PM",
  tue: "11:00 PM - 9:00 PM",
  wed: "11:00 PM - 9:00 PM",
  thu: "11:00 AM - 9:00 PM",
  fri: "11:00 AM - 9:00 PM",
  sat: "11:00 AM - 9:00 PM",
  sun: "12:00 AM - 9:00 PM",  
  web_url: "vivibubbletea.com",
  health_score: "A",
  take_out: true
)

# Business.first(11).each_with_index do |restaurant, index|
#   restaurant.picture.attach(io: 
#     URI.open("https://yep-app-seeds.s3.amazonaws.com/italian_#{index+1}.jpg"), 
#     filename: "italian_#{index+1}.jpg")
# end

def attach_thumbnail(restaurants, category)
  restaurants.each_with_index do |restaurant, index|
    restaurant.picture.attach(io:
      URI.open("https://yep-app-seeds.s3.amazonaws.com/#{category}_#{index+1}.jpg"),
      filename: "#{category}_#{index+1}.jpg")
  end
end

def attach_menu_imgs(restaurants, category)
  restaurants.each_with_index do |restaurant, index|
    restaurant.picture.attach(io:
      URI.open(
        "https://yep-app-seeds.s3.amazonaws.com/#{category}_#{index+1}_dish_1.jpg"), 
        filename: "#{category}_#{index+1}_dish_1.jpg")
    puts "#{index+1}_dish_1"
    
    restaurant.picture.attach(io:
    URI.open(
      "https://yep-app-seeds.s3.amazonaws.com/#{category}_#{index+1}_dish_2.jpg"), 
      filename: "#{category}_#{index+1}_dish_2.jpg")
    puts "#{index+1}_dish_2"
    
    restaurant.picture.attach(io:
    URI.open(
      "https://yep-app-seeds.s3.amazonaws.com/#{category}_#{index+1}_dish_3.jpg"), 
      filename: "#{category}_#{index+1}_dish_3.jpg")
    puts "#{index+1}_dish_3"
    
    restaurant.picture.attach(io:
    URI.open(
      "https://yep-app-seeds.s3.amazonaws.com/#{category}_#{index+1}_dish_4.jpg"), 
      filename: "#{category}_#{index+1}_dish_4.jpg")
    puts "#{index+1}_dish_4"
  end
end

# Attaching Thumbnails to Italian Restaurants
italian_restaurants = Business.where("category Like ?", "Italian%")
attach_thumbnail(italian_restaurants, "italian")
attach_menu_imgs(italian_restaurants, "italian")
puts "done italian seeding"

# Attaching Thumbnails to Chinese Restaurants
chinese_restaurants = Business.where("category Like ?", "Chinese%")
attach_thumbnail(chinese_restaurants, "chinese")
attach_menu_imgs(chinese_restaurants, "chinese")
puts "done chinese seeding"

# Attaching Thumbnails to French Restaurants
french_restaurants = Business.where("category Like ?", "French%")
attach_thumbnail(french_restaurants, "french")
attach_menu_imgs(french_restaurants, "french")
puts "done french seeding"

# Attaching Thumbnails to Japanese Restaurants
japanese_restaurants = Business.where("category Like ?", "Japanese%")
attach_thumbnail(japanese_restaurants, "japanese")
attach_menu_imgs(japanese_restaurants, "japanese")
puts "done japanese seeding"

# Attaching Thumbnails to Thai Restaurants
thai_restaurants = Business.where("category Like ?", "Thai%")
attach_thumbnail(thai_restaurants, "thai")
attach_menu_imgs(thai_restaurants, "thai")
puts "done thai seeding"

# Attaching Thumbnails to Mexican Restaurants
mexican_restaurants = Business.where("category Like ?", "Mexican%")
attach_thumbnail(mexican_restaurants, "mexican")
attach_menu_imgs(mexican_restaurants, "mexican")
puts "done mexican seeding"

# Attaching Thumbnails to Milk Tea Stores
milk_tea_stores = Business.where("category Like ?", "Milk Tea%")
attach_thumbnail(milk_tea_stores, "milk_tea")
attach_menu_imgs(milk_tea_stores, "milk_tea")
puts "done milk tea seeding"

puts "Done!"