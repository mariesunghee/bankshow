import React, {Component} from 'react';
import './App.css';
import Papa from 'papaparse'
import Table from 'table';

class App extends Component {
    state = {
        searchedText:"",
        data:[]
    }
    handleFileChange = (e) => {
        const file = e.target.files[0];
        Papa.parse(file, {
            complete: (results) => {
                console.log("Finished:", results.data);
                this.setState({
                    data: results.data
                })
            }
        });
    };

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


        return (
            <div className="App">
                <input type="file" onChange={this.handleFileChange}/>
                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text"><i className="fas fa-search"></i></span>
                    </div>
                    <input type="text" onKeyUp={this.handleSearchChange} className="form-control justify-content-center" placeholder="Search"/>
                </div>
                <Table data={this.state.data}/>
            </div>

        );
    }
}

export default App;
