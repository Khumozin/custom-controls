import { NgFor } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

import { User } from '../../core/models';
import { OptionComponent, SelectComponent, SelectValue } from './components';

@Component({
  selector: 'app-advanced-select-control',
  standalone: true,
  imports: [SelectComponent, OptionComponent, NgFor, ReactiveFormsModule],
  templateUrl: './advanced-select-control.component.html',
  styleUrl: './advanced-select-control.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdvancedSelectControlComponent implements OnInit {
  selectedValue = new FormControl<SelectValue<User>>([
    {
      country: 'South Africa',
      disabled: false,
      id: 1,
      name: 'Khumo',
      nickname: 'Khumozin',
    },
  ]);

  users: User[] = [
    {
      country: 'South Africa',
      disabled: false,
      id: 1,
      name: 'Khumo',
      nickname: 'Khumozin',
    },
    {
      country: 'South Africa',
      disabled: false,
      id: 2,
      name: 'Richard',
      nickname: 'MoRicho',
    },
    {
      country: 'South Africa',
      disabled: false,
      id: 3,
      name: 'Koketso',
      nickname: 'Kukie',
    },
    {
      country: 'South Africa',
      disabled: true,
      id: 4,
      name: 'Violet',
      nickname: 'MaV',
    },
    {
      country: 'South Africa',
      disabled: false,
      id: 5,
      name: 'Omphile',
      nickname: 'Phiphi',
    },
    {
      country: 'South Africa',
      disabled: false,
      id: 6,
      name: 'Galaletsang',
      nickname: 'Amu',
    },
    {
      country: 'South Africa',
      disabled: false,
      id: 7,
      name: 'Remotshepile',
      nickname: 'Mpuni',
    },
    {
      country: 'South Africa',
      disabled: true,
      id: 8,
      name: 'Keitumetse',
      nickname: 'Bombo',
    },
  ];

  filteredUsers = this.users;

  constructor(private cd: ChangeDetectorRef) {}

  ngOnInit(): void {
    // setTimeout(() => {
    //   // this.selectedValue.disable();
    // }, 4000);
    this.selectedValue.valueChanges.subscribe(this.onSelectionChanged);
  }

  onSelectionChanged(value: unknown) {
    console.log(value);
  }

  onSearchChanged(queryString: string) {
    this.filteredUsers = this.users.filter((user) =>
      user.name.toLowerCase().includes(queryString.toLowerCase()),
    );
  }

  displayWithFN(user: User) {
    return user.name;
  }

  compareWithFN(user1: User | null, user2: User | null) {
    return user1?.id === user2?.id;
  }
}
