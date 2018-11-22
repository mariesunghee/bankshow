import React, {Component} from 'react';
import './App.css';
import Papa from 'papaparse'

class App extends Component {
    state = {
        parsedData: [],
        sortFieldIndex: 0,
        isAscending: true,
        searchedText:""
    }
    handleFileChange = (e) => {
        const file = e.target.files[0];
        Papa.parse(file, {
            complete: (results) => {
                console.log("Finished:", results.data);
                this.setState({
                    parsedData: results.data
                })
            }
        });
    };
    handleSortClick = (fieldIndex) => {
        this.setState({
            sortFieldIndex: fieldIndex,
            isAscending: this.state.sortFieldIndex === fieldIndex ? !this.state.isAscending : true
        })
    }

    handleSearchChange=(e)=>{
        const value = e.target.value.toLowerCase()
        this.setState({
            searchedText: value
        })
    }

    render() {
        const filterData = this.state.parsedData.filter((transection)=>{
            return transection[1].toLowerCase().indexOf(this.state.searchedText) > -1
        });

        const sortedData = filterData.sort((a, b) => {
            let aValue = a[this.state.sortFieldIndex];
            let bValue = b[this.state.sortFieldIndex];

            // date
            if (this.state.sortFieldIndex === 0) {
                aValue = new Date(aValue).getTime();
                bValue = new Date(bValue).getTime();
            }

            if (this.state.isAscending) {
                return aValue - bValue;
            } else {
                return bValue - aValue;
            }
        });

        return (
            <div className="App">
                <input type="file" onChange={this.handleFileChange}/>
                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text" id="basic-addon1"><i className="fas fa-search"></i></span>
                    </div>
                    <input type="text" onKeyUp={this.handleSearchChange} className="form-control justify-content-center" placeholder="Search"/>
                </div>
                <table className="table table-striped">
                    <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col"> Date <button onClick={e => this.handleSortClick(0)}><i
                            className="fas fa-sort"/></button></th>
                        <th scope="col">Description</th>
                        <th scope="col"> Credit <button onClick={e => this.handleSortClick(2)}><i
                            className="fas fa-sort"/></button></th>
                        <th scope="col"> Debit <button onClick={e => this.handleSortClick(3)}><i
                            className="fas fa-sort"/></button></th>
                        <th scope="col"> Balance <button onClick={e => this.handleSortClick(4)}><i
                            className="fas fa-sort"/></button></th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        sortedData.map((transection, index) => {
                            return <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{transection[0]}</td>
                                <td>{transection[1]}</td>
                                <td>{transection[2]}</td>
                                <td>{transection[3]}</td>
                                <td>{transection[4]}</td>
                            </tr>
                        })
                    }
                    </tbody>
                </table>

            </div>

        );
    }
}

export default App;
