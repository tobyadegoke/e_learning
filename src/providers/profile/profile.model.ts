export class Profile {
  id?: string;
  email: string;
  userId: string;
  isLecturer: boolean;
  department: string;
  semester: string;
  displayname: string;
  firstname: string;
  avatar: string;
  lastname: any;
  profileCompleted: boolean;
  userType: string;
  constructor(data?: any) {
    data = data || {};
    this.avatar = data.avatar || '';
    this.email = data.email || '';
    this.isLecturer = data.isLecturer || '';
    this.firstname = data.firstname || '';
    this.displayname = data.displayname || '';
    this.lastname = data.lastname || '';
    this.department = data.department || '';
    this.semester = data.semester || '';
    this.userId = data.userId || '';
    this.profileCompleted = data.profileCompleted || false;
    this.userType = data.userType || 'Student';
  }
}
