
export const markFormGroupTouched = (fromGroup: any) => {
  (Object as any).values(fromGroup.controls).forEach((control: any) => {
    control.markAsTouched();
    if(control.controls){
      markFormGroupTouched(control);
    }
  });
}
