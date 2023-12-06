import { NgFor } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';

import { User } from '../../core/models';
import { OptionComponent, SelectComponent } from './components';

@Component({
  selector: 'app-advanced-select-control',
  standalone: true,
  imports: [SelectComponent, OptionComponent, NgFor],
  templateUrl: './advanced-select-control.component.html',
  styleUrl: './advanced-select-control.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdvancedSelectControlComponent {
  selectedValue = {
    country: 'South Africa',
    disabled: false,
    id: 1,
    name: 'Khumo',
    nickname: 'Khumozin',
  };

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
  ];

  filteredUsers = this.users;

  constructor(private cd: ChangeDetectorRef) {

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
