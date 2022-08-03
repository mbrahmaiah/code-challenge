import React from 'react'

const Records = ({ data }) => {

    const renderActionItem = (stateItem) => {
        let temp = [];
        if (stateItem && Object.keys(stateItem).length) {
            if (stateItem.level) {
                temp.push(<input type="number" style={{ "margin": "10px" }} value={stateItem.level} />);
            }
            if (stateItem.switch_state) {
                const type = stateItem.switch_state === "off" ? "secondary" : "primary";
                temp.push(<button className={`btn btn-${type}`}>{"button"}</button>);
            }
        }
        return temp;
    }
    return (
        <table className="table">
            <thead>
                <tr>
                    <th scope='col'>Device Name</th>
                    <th scope='col'>State</th>
                    <th scope='col'>Action</th>

                </tr>
            </thead>
            <tbody>
                {data.map((item, index)=> (
                    <tr key={index}>
                        <td>{item.name}</td>
                        <td>{"state"}</td>
                        <td style={{ "textAlign": "" }}>{renderActionItem(item.state)}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default Records  