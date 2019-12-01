import { Tarefa } from './../tarefa.model';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {
  @ViewChild('csvReader', null) csvReader: any;

  tarefas: Tarefa[] = [];
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
        this.tarefas = this.getDataRecordsArrayFromCSVFile(csvRecordsArray, this.headers.length);
      };

      reader.onerror = () => {
        console.log('error is occured while reading file!');
      };
    } else {
      alert('Please import valid .csv file.');
      this.fileReset();
    }
  }

  getDataRecordsArrayFromCSVFile(csvRecordsArray: string[], headerLength: any): Tarefa[] {
    const listCsv = [];

    // tslint:disable-next-line: prefer-for-of
    for (let i = 1; i < csvRecordsArray.length; i++) {
      const curruntRecord = (csvRecordsArray[i] as string).split(',');
      if (curruntRecord.length === headerLength) {
        const csvTarefa: Tarefa = new Tarefa();
        csvTarefa.data = curruntRecord[0].trim();
        csvTarefa.tarefa = curruntRecord[1].trim();
        listCsv.push(csvTarefa);
      }
    }

    return listCsv;
  }

  getHeaderArray(csvRecordsArray: string[]) {
    console.log('header');
    const headers = (csvRecordsArray[0] as string).split(',');
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
    this.tarefas = [];
  }

}
