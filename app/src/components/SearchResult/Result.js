import React from 'react';
import { Icon, Label, Menu, List, Table } from 'semantic-ui-react'
import {PriceOpt, TypeOpt, ReasonOpt, HWPOpt, LineOpt, StationOpt} from "../../components/Option/FormOption";

class Result extends React.Component {
    constructor(props) {
        super(props);
        this.columnLength = 7;
    }

    render() {
        const row = this.props.results.map(data => {
            const name = data.Name;
            const price = data.Price;
            const location = data.Station.map(location => {
                return <List.Item>{location}</List.Item>
            });
            console.log(data)
            const hmp = data.HowManyPeople.map(people => {
                return <List.Item>{people}</List.Item>;
            });
            const reason = data.Reason.map(reason => {
                return <List.Item>{reason}</List.Item>;
            });
            const type = data.Type;
            const rating = data.OfficialRating;
            return (
                <Table.Row>
                    <Table.Cell>{name}</Table.Cell>
                    <Table.Cell>
                        <List>
                            {location}
                        </List>
                    </Table.Cell>
                    <Table.Cell>{price}</Table.Cell>
                    <Table.Cell>{type}</Table.Cell>
                    <Table.Cell>
                        <List>
                            {hmp}
                        </List>    
                    </Table.Cell>
                    <Table.Cell>
                        <List>
                            {reason}
                        </List>
                    </Table.Cell>
                    <Table.Cell>{rating}</Table.Cell>
                </Table.Row>
            )
        })
        return (
            <Table celled columns={this.columnLength}>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Name: </Table.HeaderCell>
                        <Table.HeaderCell>Station: </Table.HeaderCell>
                        <Table.HeaderCell>Price: </Table.HeaderCell>
                        <Table.HeaderCell>Type: </Table.HeaderCell>
                        <Table.HeaderCell>No. of People: </Table.HeaderCell>
                        <Table.HeaderCell>Reason: </Table.HeaderCell>
                        <Table.HeaderCell>Rating: </Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {row}
                </Table.Body>
            </Table>
        )
    }
}

export default Result;