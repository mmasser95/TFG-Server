
module.exports={
	SECRET_TOKEN:process.env.SECRET_TOKEN||'mySecretToken',
	PORT:process.env.PORT||5000,
	DB_URL:process.env.DB_URL||'mongodb://127.0.0.1/myApp'
}
