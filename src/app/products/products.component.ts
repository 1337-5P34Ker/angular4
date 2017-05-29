
import { Component, OnInit } from '@angular/core';
import { SampleProducts } from '../products';
import { GridModule } from '@progress/kendo-angular-grid';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { GridComponent,    GridDataResult,    DataStateChangeEvent } from '@progress/kendo-angular-grid';
import { State, process } from '@progress/kendo-data-query';
import { SortDescriptor, orderBy } from '@progress/kendo-data-query';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

private sort: SortDescriptor[] = [];
private gridView: GridDataResult;
//private gridData: any[] = SampleProducts;
public hiddenColumns: string[] = [];
private state: State = {
        sort: [],
        skip: 0,
        take: 5
    };
private gridData: GridDataResult = process(SampleProducts, this.state);
  constructor() {
console.log('constructor');
 this.loadProducts();
  }

protected editHandler({sender, rowIndex, dataItem}) {
  console.log('edit');
    // define all editable fields validators and default values
    const group = new FormGroup({
        'ProductID': new FormControl(dataItem.ProductID),
        'ProductName': new FormControl(dataItem.ProductName, Validators.required),
        'UnitPrice': new FormControl(dataItem.UnitPrice),
        'UnitsInStock': new FormControl(dataItem.UnitsInStock, Validators.compose([Validators.required, Validators.pattern('^[0-9]{1,2}')])),
        'Discontinued': new FormControl(dataItem.Discontinued)
    });

    // put the row in edit mode, with the `FormGroup` build above
    sender.editRow(rowIndex, group);
}



protected addHandler({sender}) {
   console.log('add');
    // define all editable fields validators and default values
    const group = new FormGroup({
        'ProductID': new FormControl(this.gridData.total + 1),
        'ProductName': new FormControl("", Validators.required),
        'UnitPrice': new FormControl(0),
        'UnitsInStock': new FormControl("", Validators.compose([Validators.required, Validators.pattern('^[0-9]{1,2}')])),
        'Discontinued': new FormControl(false),
     
    });

    // show the new row editor, with the `FormGroup` build above
    sender.addRow(group);
    console.log(group);
}


 protected dataStateChange(state: DataStateChangeEvent): void {
        this.state = state;
        this.gridData = process(SampleProducts, this.state);
    }

public restoreColumns(): void {
  console.log('restore columns');
        this.hiddenColumns = [];
    }

public hideColumn(field: string): void {
  console.log('hide ' + field);
        this.hiddenColumns.push(field);
        console.log(this.hiddenColumns);
    }

protected cancelHandler({sender, rowIndex}) {
    
    }
 protected sortChange(sort: SortDescriptor[]): void {
   console.log(sort);
        this.sort = sort;
        this.loadProducts();
    }
private loadProducts(): void {
  console.log('loadProducts');
        this.gridView = {
            data: orderBy(this.gridData.data, this.sort),
            total: this.gridData.total
        };
        console.log('this.gridData.length: ' + this.gridData.total);
    }

protected saveHandler({sender, rowIndex, formGroup, isNew}) {
   console.log('save');
    // collect current state of the from
    // `formGroup` arguments is the same that was provided when calling `editRow`
    const product: any = formGroup.value;
    this.gridData.data.push(formGroup.value);
     console.log(formGroup.value);
    console.log(this.gridData.total);

    // update the data source
    //this.editService.save(product, isNew);

    // close the editor, i.e revert the row back into view mode
    sender.closeRow(rowIndex);
}


protected removeHandler({dataItem}) {
   console.log('remove');
    // remove current dataItem from current data source,
    // `editService` in this example
    //this.editService.remove(dataItem);
}
public ngOnInit(): void {
        
    }}
