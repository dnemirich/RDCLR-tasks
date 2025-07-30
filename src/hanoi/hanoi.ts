export const solveHanoi = (n: number): string[] => {
    const result = []
    const start = 'A'
    const temp = 'B'
    const aim = 'C'

    const moveDisc = (n: number, start: string, aim: string, temp: string) => {
        if (n === 1) {
            result.push(`Move disk 1 from ${start} to ${aim}`)
            return;
        } else {
            moveDisc(n - 1, start, temp, aim)
            result.push(`Move disk ${n} from ${start} to ${aim}`)
            moveDisc(n - 1, temp, aim, start)
        }
    }

    moveDisc(n, start, aim, temp)
    return result;
}