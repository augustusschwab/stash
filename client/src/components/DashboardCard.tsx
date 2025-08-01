export interface DashboardCard {
    title: string;
    value: number;
}

// The DashboardCard function deconstructs the props passed to DashboardCard and renders a dashboard card with the values passed.
const DashboardCardComponent = ({title, value}: DashboardCard) => {
    return(
        <div className="dashboard-card">
            <h2>{title}</h2>
            <p>${value}</p>
        </div>
    )
}

export default DashboardCardComponent;
