import { Line } from '../line.model';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatPaginatorModule, MatSort } from '@angular/material';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {
  @ViewChild('csvReader', null) csvReader: any;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;



  displayedColumns: string[] =  [];
  // lines: Line[] = [];
  lines: any[] = [];
  headers: any;

  constructor() { }

  ngOnInit() {
  }

  uploadCsv($event: any) {
    const text = [];
    const files = $event.srcElement.files;

    if (this.isValidCSVFile(files[0])) {
      const input = $event.target;
      const reader = new FileReader();

      reader.readAsText(input.files[0]);

      reader.onload = () => {
        const csvData = reader.result;
        const csvRecordsArray = (csvData as string).split(/\r\n|\n/);

        this.headers = this.getHeaderArray(csvRecordsArray);
        // TODO colocar o tipo de objeto
        // this.lines = new MatTableDataSource<any>(
          // this.getDataRecordsArrayFromCSVFile(csvRecordsArray, this.headers.length));

        this.lines = this.getDataRecordsArrayFromCSVFile(csvRecordsArray, this.headers.length);

        // this.lines = new MatTableDataSource(this.getDataRecordsArrayFromCSVFile(csvRecordsArray, this.headers.length));
        // this.lines.paginator = this.paginator;


        this.displayedColumns = ['status', 'tipoEvento', 'fundo', 'ativo', 'bla'];
      };

      reader.onerror = () => {
        console.log('error is occured while reading file!');
      };
    } else {
      alert('Please import valid .csv file.');
      this.fileReset();
    }
  }

  getDataRecordsArrayFromCSVFile(csvRecordsArray: string[], headerLength: any): any[] {
    const listCsv = [];
    // tslint:disable-next-line: prefer-for-of
    for (let i = 1; i < csvRecordsArray.length; i++) {
      const curruntRecord = (csvRecordsArray[i] as string).split(';');
      if (curruntRecord.length === headerLength) {
        // const csvTarefa: Tarefa = new Tarefa();
        const csvTarefa: any = {};
        csvTarefa.status = curruntRecord[0].trim();
        csvTarefa.tipo_evento = curruntRecord[1].trim();
        csvTarefa.fundo = curruntRecord[2].trim();
        csvTarefa.ativo = curruntRecord[3].trim();
        csvTarefa.bla = curruntRecord[4].trim();
        listCsv.push(csvTarefa);
      }
    }
    return listCsv;
  }

  getHeaderArray(csvRecordsArray: string[]) {
    console.log('header');
    const headers = (csvRecordsArray[0] as string).split(';');
    console.log(headers);
    const headerArray = [];

    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < headers.length; i++) {
      headerArray.push(headers[i]);
    }
    console.log(headerArray);
    return headerArray;
  }

  isValidCSVFile(file: any) {
    return file.name.endsWith('.csv');
  }

  fileReset() {
    this.csvReader.nativeElement.value = '';
    this.lines = [];
  }

}
