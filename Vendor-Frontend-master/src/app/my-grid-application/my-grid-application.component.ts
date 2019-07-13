import {Component,OnInit} from "@angular/core";
import {Router} from '@angular/router';
import {RedComponentComponent} from "../red-component/red-component.component";

import {GridOptions} from "ag-grid/main";
import {AddVendorService} from "../vendorAdd/vendorAdd.service"
import{AppService} from "../app.service";
import{VendorUpdateComponent} from "../vendorUpdate/vendorUpdate.component"

@Component({
    selector: 'app-my-grid-application',
    templateUrl: './my-grid-application.component.html'
})
export class MyGridApplicationComponent  {
    gridOptions: GridOptions;
    columnDefs: any[]
    rowData: any [];
    vendors:any;
    uflag:boolean;
    aflag:boolean;   
    vendorDetails:any[];
    

    constructor(private appService:AppService,private vendorAdd:AddVendorService,private router:Router) {
        console.log("in Grid ");
        this.gridOptions = <GridOptions>{ singleClickEdit: true};
        this.aflag=true;
        this.columnDefs = [
            {headerName: "VendorId", field: "vendor_id",cellRenderer: function(params) {
                return '<a href ="comment/'+params.node.data.vendor_id+'/'+params.node.data.personName+'"'+'>'+ params.value+'</a>'
            }},
            {headerName: "Vendor Company", field: "vendorCompanyName", cellRendererFramework: RedComponentComponent, editable: true},
            {headerName: "Person Name", field: "personName", cellRenderer: function(params) {
                return '<a href ="comment/'+params.node.data.vendor_id+'/'+params.node.data.personName+'"'+'>'+ params.value+'</a>'
            }},
            {headerName: "Phone", field: "phone",editable: true},
            {headerName: "Postion Location", field: "position_location",editable: true},
            {headerName: "Position Title", field: "position_title",editable: true},
            {headerName: "Submitted Status", field: "submitted_status",editable: true},
            {headerName: "Client", field: "client",editable: true},
            {headerName: "Submitted By", field: "username",editable: true},
            {headerName: "Submited Date", field: "submitted_date",editable: true}
        ];
        this.gridOptions.singleClickEdit = true;
        
        this.appService.getAll().subscribe(vendors =>{
                //this.rowData= JSON.stringify(vendors);
                localStorage.setItem('vendordetails',JSON.stringify(vendors));
                    this.rowData= JSON.parse(localStorage.getItem('vendordetails'));
               console.log(this.rowData);
               
        })
        // this.rowData = [
        //     {make: "Toyota", model: "Celica", price: 35000},
        //     {make: "Ford", model: "Mondeo", price: 32000},
        //     {make: "Porsche", model: "Boxter", price: 72000}
        // ]
    }

    vendorUpdate(){
            this.router.navigate(['update']);
    }
setRowData(vendors){
    console.log("In grid Setter")
    this.vendorDetails=vendors;
}
getRowData(){
    console.log("In grid getter");
    return this.vendorDetails;
}

updateRowData(){
    this.appService.getAll().subscribe(vendors =>{
        //this.rowData= JSON.stringify(vendors);
        localStorage.setItem('updatedVendordetails',JSON.stringify(vendors));
         this.rowData= JSON.parse(localStorage.getItem('updatedVendordetails'));
         this.uflag=false;
       console.log(this.rowData);
       
})

}
    private onRowClicked($event) {
        console.log('onRowClicked: ' + $event.node.data.vendor_id);
        console.log( $event.rowIndex);

        this.vendorDetails=this.gridOptions.api.getSelectedRows();  
        this.setRowData(this.vendorDetails);   
        console.log("Vendor Name :"+this.vendorDetails[0].personName);
        //this.vendorUpdate.setVendorDetails(this.vendorDetails);
        // localStorage.setItem('vendors',this.vendorDetails[0]);
         console.log("ianaks"+JSON.stringify(this.gridOptions.api.getSelectedRows()))
       // console.log("Hello"+selectedRows);
        //var rowNode = this.gridOptions.api.getDisplayedRowAtIndex(0);
        //console.log('getDisplayedRowAtIndex(0) => ' + nodeToString(rowNode));
      //  this.uflag=this.vendorUpdate.getVendorDetails();
      this.uflag=true;
    }
    private onSelectionChanged($event){
        //console.log("selection", event);
    }
    private onRowSelected($event) {

        //console.log('row'+JSON.stringify(this.gridOptions.api.getSelectedRows()))
        
    }

    onGridReady(params) {
        params.api.sizeColumnsToFit();
    }
    
    selectAllRows() {
        this.gridOptions.api.selectAll();
    }

    public onQuickFilterChanged($event) {
        console.log($event.target.value);
        this.gridOptions.api.setQuickFilter($event.target.value);
    }
// vinay change
    onCellValueChanged($event){
        console.log("cell value changed");
        console.log($event.node.data);
        this.vendorAdd.updateVendor($event.node.data);
    }

    vendorComment(){
        console.log("hola hola");
    this.router.navigate(["comment/115"]);
    }
 //   
}

