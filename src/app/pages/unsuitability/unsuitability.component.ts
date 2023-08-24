import { Component, OnInit } from '@angular/core';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { Unsuitability } from 'src/app/models/unsuitability';
import { UnsuitabilityService } from 'src/app/services/getUnsuitabilityService';
import { LocalStorageService } from 'src/app/services/localStorageService';

@Component({
  selector: 'app-unsuitability',
  templateUrl: './unsuitability.component.html',
  styleUrls: ['./unsuitability.component.scss'],
})
export class UnsuitabilityComponent implements OnInit {
  selectedDynamicField: any[] = [];
  dynamicField: any[] = [];

  unsuitabilityList: Unsuitability[] = [];
  dialogVisible: boolean = false;
  cols: any[] = [];

  constructor(
    public layoutService: LayoutService,
    public unsuitabilityService: UnsuitabilityService,
    private localStorageService: LocalStorageService
  ) {
    layoutService.title = 'Uygunsuzluk Takip Listesi';
  }

  ngOnInit(): void {
    this.unsuitabilityService.getUnsuitability().subscribe(
      (unsuitabilityList) => {
        this.unsuitabilityList = unsuitabilityList;
        const customFieldNames = new Set<string>();
        this.unsuitabilityList.forEach((item) => {
          Object.keys(item).forEach((key) => {
            if (
              key !== 'requestNumber' &&
              key !== 'createdDate' &&
              key !== 'notifyingPerson' &&
              key !== 'otherCol' &&
              key !== 'desc'
            ) {
              customFieldNames.add(key);
            }
          });
        });
        customFieldNames.forEach((fieldName) => {
          this.dynamicField.push({
            field: fieldName,
            header: fieldName,
          });
        });

        this.selectedDynamicField =
          this.localStorageService.getItem('selectedDynamicField') || [];
        this.updateCols();
      },
      (error) => {
        console.error('Hata oluştu:', error);
      }
    );
  }

  isSelected(field: any): boolean {
    const fieldKey = field.field;
    const selectedKeys = this.selectedDynamicField.map((item) => item.field);
    return (
      selectedKeys.includes(fieldKey) ||
      this.localStorageService
        .getItem('selectedDynamicField')
        ?.map((item: { field: any }) => item.field)
        .includes(fieldKey)
    );
  }

  showDialog() {
    this.dialogVisible = true;
  }

  toggleFieldSelection(field: any) {
    const fieldIndex = this.selectedDynamicField.findIndex(
      (item) => item.field === field.field
    );
    if (fieldIndex !== -1) {
      this.selectedDynamicField.splice(fieldIndex, 1);
    } else {
      this.selectedDynamicField.push(field);
    }
    this.updateCols();
    if (this.selectedDynamicField.length === 0) {
      this.localStorageService.removeItem('selectedDynamicField');
    } else {
      this.localStorageService.setItem(
        'selectedDynamicField',
        this.selectedDynamicField
      );
    }
  }

  updateCols() {
    this.cols = [
      { field: 'requestNumber', header: 'Talep Numarası' },
      { field: 'createdDate', header: 'Oluşturma Tarihi' },
      { field: 'notifyingPerson', header: 'Bildiren Kişi' },
      ...this.selectedDynamicField,
      { field: 'otherCol', header: 'Detayı Gör' },
      { field: 'desc', header: 'desc' },
    ];
  }
}
