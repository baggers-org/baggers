import { DashedCard } from '@/components/DashedCard';
import { CardContent, Typography, Button, CardActionArea } from '@mui/material';

export interface AddFirstPositionCardProps {
  onClick: () => void;
  title: string;
  graphic: any;
  description: string;
  buttonText: string;

  isButtonDisabled?: boolean;
}
export const AddFirstPositionCard: React.FC<AddFirstPositionCardProps> = ({
  onClick,
  title,
  description,
  buttonText,
  graphic,
  isButtonDisabled,
}) => {
  return (
    <DashedCard>
      <CardActionArea onClick={onClick}>
        <CardContent
          sx={{
            display: `grid`,
            alignItems: `center`,
            justifyItems: `center`,
            gridGap: 10,
            height: `400px`,
          }}
        >
          {graphic}
          <Typography variant="h5" textAlign="center">
            {title}
          </Typography>
          <Typography variant="caption" textAlign="center">
            {description}
          </Typography>
          <Button disabled={isButtonDisabled} variant="contained">
            {buttonText}
          </Button>
        </CardContent>
      </CardActionArea>
    </DashedCard>
  );
};
