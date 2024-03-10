export class AgeVerify {
  validate(dateString: string): number {
    const [day, month, year] = dateString.split('/').map(Number);
    const birthDate = new Date(year, month - 1, day);
    const currentDate = new Date();
    let age = currentDate.getFullYear() - birthDate.getFullYear();

    if (
      currentDate.getMonth() < birthDate.getMonth() ||
      (currentDate.getMonth() === birthDate.getMonth() &&
        currentDate.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    return age;
  }
}
