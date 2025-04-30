-- Drop tables if they already exist to avoid conflicts
DROP TABLE IF EXISTS interests, notifications, feedbacks, transactions, chats, purchase_requests, carts, product_media, products, categories, users CASCADE;

-- Users table
CREATE TABLE users (
	user_id SERIAL PRIMARY KEY,
	name VARCHAR(100) NOT NULL,
	email VARCHAR(100) UNIQUE NOT NULL,
	password_hash TEXT NOT NULL,
	profile_picture TEXT,
	contact_info TEXT,
	address TEXT,
	role VARCHAR(20) CHECK (role IN ('buyer', 'seller', 'admin')),
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Categories table
CREATE TABLE categories (
	category_id SERIAL PRIMARY KEY,
	name VARCHAR(50) UNIQUE NOT NULL
);	

-- Products table
CREATE TABLE products (
	product_id SERIAL PRIMARY KEY,
	seller_id INT REFERENCES users(user_id) ON DELETE CASCADE,
	name VARCHAR(100) NOT NULL,
	description TEXT NOT NULL,
	price NUMERIC(10,2) NOT NULL,
	category_id INT REFERENCES categories(category_id),
	status VARCHAR(20) DEFAULT 'available' CHECK (status IN ('available', 'sold', 'draft', 'removed')),
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Product media table
CREATE TABLE product_media (
	media_id SERIAL PRIMARY KEY,
	product_id INT REFERENCES products(product_id) ON DELETE CASCADE,
	media_url TEXT NOT NULL,
	media_type VARCHAR(10) CHECK (media_type IN ('image', 'video'))
);

-- Carts table
CREATE TABLE carts (
	cart_id SERIAL PRIMARY KEY,
	buyer_id INT REFERENCES users(user_id) ON DELETE CASCADE,
	product_id INT REFERENCES products(product_id),
	added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Purchase requests table
CREATE TABLE purchase_requests (
	request_id SERIAL PRIMARY KEY,
	product_id INT REFERENCES products(product_id) ON DELETE CASCADE,
	buyer_id INT REFERENCES users(user_id),
	status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'declined')),
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Chats table
CREATE TABLE chats (
	chat_id SERIAL PRIMARY KEY,
	request_id INT REFERENCES purchase_requests(request_id) ON DELETE CASCADE,
	sender_id INT REFERENCES users(user_id),
	message TEXT NOT NULL,
	sent_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Transactions table
CREATE TABLE transactions (
	transaction_id SERIAL PRIMARY KEY,
	buyer_id INT REFERENCES users(user_id),
	seller_id INT REFERENCES users(user_id),
	product_id INT REFERENCES products(product_id),
	final_price NUMERIC(10,2) NOT NULL,
	transaction_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Feedbacks table
CREATE TABLE feedbacks (
	feedback_id SERIAL PRIMARY KEY,
	transaction_id INT REFERENCES transactions(transaction_id) ON DELETE CASCADE,
	giver_id INT REFERENCES users(user_id),
	receiver_id INT REFERENCES users(user_id),
	rating SMALLINT CHECK (rating BETWEEN 1 AND 5),
	comment TEXT,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Notifications table
CREATE TABLE notifications (
	notification_id SERIAL PRIMARY KEY,
	user_id INT REFERENCES users(user_id),
	content TEXT NOT NULL,
	is_read BOOLEAN DEFAULT FALSE,
	is_starred BOOLEAN DEFAULT FALSE,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Interests table (for user preferred categories)
CREATE TABLE interests (
	interest_id SERIAL PRIMARY KEY,
	user_id INT REFERENCES users(user_id),
	category_id INT REFERENCES categories(category_id),
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


