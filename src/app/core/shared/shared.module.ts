import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardAssetPipe } from './card-asset.pipe';

@NgModule({
  declarations: [CardAssetPipe],
  imports: [CommonModule],
  exports: [CardAssetPipe],
})
export class SharedModule {}
