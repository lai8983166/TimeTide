"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setScheduleAware = exports.getScheduleByDateAndCategory = exports.getTableByDateRange = exports.getTableByDate = void 0;
//获取某个日期的表
const getTableByDate = () => __awaiter(void 0, void 0, void 0, function* () { });
exports.getTableByDate = getTableByDate;
//根据日期范围获取表
const getTableByDateRange = (beginDate, endDate) => __awaiter(void 0, void 0, void 0, function* () { });
exports.getTableByDateRange = getTableByDateRange;
//根据具体的表获取某种类型的活动记录
const getScheduleByDateAndCategory = () => __awaiter(void 0, void 0, void 0, function* () { });
exports.getScheduleByDateAndCategory = getScheduleByDateAndCategory;
//设置某个活动为提醒
const setScheduleAware = () => __awaiter(void 0, void 0, void 0, function* () { });
exports.setScheduleAware = setScheduleAware;
