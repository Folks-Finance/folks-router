import { useState } from "react";

import PlaceholderIcon from "~icons/token-icons/placeholder.svg";

interface AssetIconFallbackProps {
  assetId: number;
  unitName: string;
}

export const AssetIconFallback = ({ assetId, unitName }: AssetIconFallbackProps) => {
  const [error, setError] = useState(false);

  if (error) return <PlaceholderIcon className="h-6 w-6" />;

  return (
    <img
      src={`https://asa-list.tinyman.org/assets/${assetId}/icon.svg`}
      alt={`${unitName} ICON`}
      onError={() => setError(true)}
      className="h-6 w-6"
    />
  );
};
