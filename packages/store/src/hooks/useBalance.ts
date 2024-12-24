import { useRecoilValue } from "recoil"
import { balanceAtom } from "../atoms/balace"


export const useBalance = () => {
    const value = useRecoilValue(balanceAtom);
    return value;
}
