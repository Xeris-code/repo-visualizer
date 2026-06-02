type SideBarProps = {
    label: string
}

export function SideBar ({

}: SideBarProps) {

    return (
        <div className="flex flex-col h-full p-5">
            <div>
                Repo Visualizer
            </div>
        </div>
    )
}