import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { SentinelBaseDirective } from '@sentinel/common';
import { TraineeAccessTrainingFormGroup } from './trainee-access-training-form-group';
import { AbstractControl } from '@angular/forms';

/**
 * Component for trainee access to training run by inserting token
 */
@Component({
  selector: 'kypo-access-training-run',
  templateUrl: './access-training-run.component.html',
  styleUrls: ['./access-training-run.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccessTrainingRunComponent extends SentinelBaseDirective implements OnInit {
  @ViewChild('pin') accessTokenPinInput: ElementRef;
  @ViewChild('accessButton') accessButton: MatButton;

  @Output() accessToken: EventEmitter<string> = new EventEmitter<string>();

  traineeAccessTrainingFormGroup: TraineeAccessTrainingFormGroup;

  ngOnInit(): void {
    this.traineeAccessTrainingFormGroup = new TraineeAccessTrainingFormGroup();
  }

  get accessTokenPrefix(): AbstractControl {
    return this.traineeAccessTrainingFormGroup.formGroup.get('accessTokenPrefix');
  }
  get accessTokenPin(): AbstractControl {
    return this.traineeAccessTrainingFormGroup.formGroup.get('accessTokenPin');
  }

  /**
   * Emits event to access with inserted access token
   */
  access(): void {
    const accessToken = this.accessTokenPrefix.value + '-' + this.accessTokenPin.value;
    this.accessToken.emit(accessToken);
  }

  /**
   * Handles paste event to split pasted access token (prefix and generated pin code) between two input elements
   * (access token is in format prefix-pincode)
   * @param event js clipboard event
   */
  onPaste(event: ClipboardEvent): void {
    const pastedText = event.clipboardData.getData('text');
    if (pastedText.includes('-')) {
      event.preventDefault();
      this.accessTokenPrefix.setValue(pastedText.slice(0, pastedText.indexOf('-')).trim());
      this.accessTokenPin.setValue(pastedText.slice(pastedText.indexOf('-') + 1, pastedText.length).trim());
      this.traineeAccessTrainingFormGroup.formGroup.updateValueAndValidity();
      this.accessTokenPin.markAsTouched();
      this.accessTokenPrefix.markAsTouched();
      setTimeout(() => this.accessButton.focus());
    }
  }

  /**
   * Waits on '-' key insertion and automatically changes to focus from prefix input to pin code input
   * (access token is in format prefix-pincode)
   * @param event js keyup event
   */
  onKeyup(event: KeyboardEvent): void {
    if (event.key === '-') {
      this.accessTokenPinInput.nativeElement.focus();
      this.accessTokenPrefix.setValue(this.accessTokenPrefix.value.slice(0, -1));
    }
  }
}
