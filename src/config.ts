//configuration information 
export const Config={
    serverport: process.env.PORT || 3000,
    secret: process.env.SECRET || "some-secret-goes-here",
    tokenLife: 1800,
    url: process.env.MONGOURL || "mongodb+srv://short:fuse@devcluster.8ejzl.mongodb.net?retryWrites=true&w=majority",
    url_elevated: process.env.MONGOURL || "mongodb+srv://elevated:p3rm1ss10ns@devcluster.8ejzl.mongodb.net?retryWrites=true&w=majority"
};