import { Model, DataTypes} from 'sequelize';
import sequelize from '../config/db';

class Log extends Model{
    public id!:number;
    public category!: string;
    public timeMode!:string;
    public startTime!:Date;
    public endTime!:Date;
    public probableTime!:number;
    public isAware!:boolean;
}

Log.init(
    {
        id:{
            type:DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },
        category:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        timeMode:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        startTime:{
            type:DataTypes.DATE,
            allowNull:false,
        },
        endTime:{
            type:DataTypes.DATE,
            allowNull:false,
        },
        probableTime:{
            type:DataTypes.INTEGER,
            allowNull:false,
        },
        isAware:{
            type:DataTypes.BOOLEAN,
            allowNull:false,
        },        
    },
    {
        sequelize, // 连接实例
        modelName: 'Log',
        tableName: 'logs', // 指定表名
        timestamps: false, // 不使用自动时间戳
    }
);

export default Log;