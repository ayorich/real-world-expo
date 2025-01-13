import { Button, Icon } from '@rneui/themed';

export function HeaderButton({ iconName, ...props }) {
  return (
    <Button buttonStyle={{ backgroundColor: 'transparent' }} {...props}>
      <Icon color="white" name={iconName} type="ionicon" />
    </Button>
  );
}
