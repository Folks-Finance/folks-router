import { ABIContract } from "algosdk";
import routerABI from "./router.json";

export const routerABIContract = new ABIContract(routerABI);
