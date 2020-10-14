import React from 'react';
import './styles/App.css';
import units from './data/Units';
import UnitOptionsC from './components/UnitOptionsC';
import InputBoxC from './components/InputBoxC';
import UnitOptionsS from './components/UnitOptionsS';
import InputBoxS from './components/InputBoxS';
import convert from 'convert-units';
import Recommended from './components/Recommended';
import ScaleOptions from './components/ScaleOptions';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      units: units,
      unitA: units[0].abbr,
      unitB: units[5].abbr,
      unitAvalue: '',
      unitBvalue: '',
      toggleRec: false,
      scaleAvalue: '',
      scaleBvalue: '',
      scaleUnit: units[0].abbr,
      scaleFactor: 1,
      toggleScaleRec: true,
    }
  }

  handleOptionsC = event => {
    const {unitA, unitB, unitAvalue} = this.state;
    const rec_arr = ['cup', 'Tbs', 'tsp'];
    if(event.target.name === 'unitA') {
      const newBval = convert(unitAvalue).from(event.target.value).to(unitB);
      this.setState({
        unitA: event.target.value, 
        unitAvalue: unitAvalue, 
        unitBvalue: newBval
      })
      if(rec_arr.indexOf(event.target.value) >= 0 && !Number.isInteger(newBval)) {
        this.setState({toggleRec: true})
      } else {
        this.setState({toggleRec: false})
      } 
    } else if (event.target.name === 'unitB') {
      const newBval = convert(unitAvalue).from(unitA).to(event.target.value);
      this.setState({
        unitB: event.target.value, 
        unitAvalue: unitAvalue, 
        unitBvalue: newBval
      })
      if(rec_arr.indexOf(event.target.value) >= 0 && !Number.isInteger(newBval)) {
        this.setState({toggleRec: true})
      } else {
        this.setState({toggleRec: false})
      } 
    }
  }


  handleInputBoxC = event => {
    const {unitA, unitB} = this.state;
    const rec_arr = ['cup', 'Tbs', 'tsp'];
    const newBval = convert(event.target.value).from(unitA).to(unitB);
    this.setState({
      unitAvalue: event.target.value,
      unitBvalue: newBval
    })
    if(rec_arr.indexOf(unitB) >= 0 && !Number.isInteger(newBval)) {
      this.setState({toggleRec: true})
    } else {
      this.setState({toggleRec: false})
    }
  }

  handleSwitch = event => {
    const currUnitA = this.state.unitA;
    const currUnitB = this.state.unitB;
    const currValA = this.state.unitAvalue;
    const currValB = this.state.unitBvalue;
    this.setState({
      unitA: currUnitB,
      unitB: currUnitA,
      unitAvalue: currValB,
      unitBvalue: currValA
    })
  }

  handleOptionsS = event => {
    this.setState({
      scaleUnit: event.target.value,
    })
  }

  handleInputBoxS = event => {
    const {scaleUnit, scaleFactor} = this.state;
    if(scaleUnit === 'cup' || scaleUnit === 'Tbs' || scaleUnit === 'tsp') {
      this.setState({
        scaleAvalue: event.target.value,
        toggleScaleRec: true
      })
    } else {
      this.setState({
        scaleAvalue: event.target.value,
        toggleScaleRec: false,
        scaleBvalue: event.target.value * scaleFactor
      })
    }
  }

  handleScales = event => {
    const {scaleUnit, scaleAvalue} = this.state;
    if(scaleUnit === 'cup' || scaleUnit === 'Tbs' || scaleUnit === 'tsp') {
      console.log('Hello')
      this.setState({
        scaleFactor: event.target.value,
        toggleScaleRec: true
      })
    } else {
      this.setState({
        scaleFactor: event.target.value,
        toggleScaleRec: false,
        scaleBvalue: scaleAvalue * event.target.value
      })
    }
  }

  render() {
    return (
      <div className="container">
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossOrigin="anonymous"></link>
        <div className="row title">Cooking Calculator</div>
        <div className="row">
          <div className="convert col-md">
            <div className="row title2">Convert</div>
            <div className="row convertA">
              <InputBoxC data={{ currentVal: this.state.unitAvalue}} handleInput={this.handleInputBoxC}/>
              <UnitOptionsC units={units} data={{ selOption: this.state.unitA, name: 'unitA'}} handleOptions = {this.handleOptionsC}/>
              <img src="https://img.pngio.com/arrows-vertical-switch-arrow-orientation-swap-sort-icon-sort-icon-png-512_512.png" alt="switch button" className="switch" onClick={this.handleSwitch}/>
            </div>
            <div className="row equals">=</div>
            <div className="row convertB">
              <div className="output">{this.state.unitBvalue !== '' ? Math.round(this.state.unitBvalue * Math.pow(10,5)) / Math.pow(10,5) : null}</div>
              <UnitOptionsC units={units} data={{selOption: this.state.unitB, name: 'unitB'}} handleOptions = {this.handleOptionsC}/>
            </div>
            { this.state.toggleRec ? <div><div className="row rec1">Recommended:</div><div className="row rec2"><Recommended unitB={this.state.unitB} unitBvalue={this.state.unitBvalue}/></div></div> : null }
          </div>
          <div className="scale col-md">
            <div className="row title2">Scale</div>
            <div className="row scaleA">
              <InputBoxS data={{ currentVal: this.state.scaleAvalue}} handleInput={this.handleInputBoxS}/>
              <UnitOptionsS units={units} data={{selOption: this.state.scaleUnit}} handleOptions = {this.handleOptionsS}/>
            </div>
            <div className="row scaleB">
              <span className="scaleby">Scale By: </span>
              <ScaleOptions data={{selOption: this.state.scaleFactor}} handleScales = {this.handleScales}/>
            </div>
            <div className="row equals">=</div>
            <div className="row scaleC">{(this.state.toggleScaleRec && this.state.scaleAvalue !== '')? <Recommended unitB={this.state.scaleUnit} unitBvalue={this.state.scaleAvalue * this.state.scaleFactor}/> : (this.state.scaleAvalue !== ''? <span>{Math.round(this.state.scaleBvalue * Math.pow(10,5)) / Math.pow(10,5) + " " + this.state.scaleUnit}</span>: null)}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;