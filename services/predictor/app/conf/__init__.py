class Settings:
    
    def __init__(self, 
                 host    : str = "0.0.0.0", port    : int = 8080,
                 db_host : str = "mongo", db_port   : int = 3306) -> None:
        # Server address
        self.host = host
        self.port = port
        
        # Database address
        self.db_host = db_host
        self.db_port = db_port
        

settings = Settings()
