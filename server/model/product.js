module.exports = (connection, DataTypes) => {
    const Product = connection.define(
      "products",
      {
        name: {
          type: DataTypes.STRING,
        
        },
        imgurl: {
          type: DataTypes.STRING,
        
        },
        price: {
          type: DataTypes.INTEGER,
          defaultValue: 0,
      
        },
    
       
        description: {
          type: DataTypes.STRING,
  
        }
      },
    );
    return Product;
  };
  