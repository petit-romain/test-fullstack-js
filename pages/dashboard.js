const Dashboard = () => {
    return <div>
        <h1> Dashboard </h1>
    </div>
}

// This gets called on every request
export async function getServerSideProps() {

    // Pass data to the page via props
    return {props: {}}
}


export default Dashboard