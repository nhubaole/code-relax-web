import solved from "../assets/solve.svg"

export const EasyTag = () => {
    return (
        <div>Easy</div>
    )
}

export const MediumTag = () => {
  return (
    <div className="bg-[#2A2B2D] rounded-[100px] text-yellow-300 font-medium text-base px-2 py-1">Medium</div>
  )
}
export const HardTag = () => {
    return (
        <div>Hard</div>
    )
}

export const SolvedTag = () => {
    return (
        <div className="flex space-x-3">
            <img className="w-6 h-6" src={solved} alt="" />
            <p className="text-green-300">Solved</p>
        </div>
    )
}
interface ProblemTagProps {
    name: string,
     isActive?: boolean
}
export const ProblemTag = (prop: ProblemTagProps) => {
    return (
        <div className={`bg-[#FFF] rounded-[100px] px-3 py-1 text-green-700`}>
            {prop.name}
        </div>
    )
}