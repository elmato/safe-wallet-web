import type { ReactElement } from 'react'
import type { AddressEx } from '@safe-global/safe-gateway-typescript-sdk'
import CopyButton from '@/components/common/CopyButton'
import { HexEncodedData } from '@/components/transactions/HexEncodedData'
import { Typography, Box } from '@mui/material'
import { dataLength } from 'ethers'
import EthHashInfo from '@/components/common/EthHashInfo'
import { DataRow } from '@/components/common/Table/DataRow'

export const TxDataRow = DataRow

export const generateDataRowValue = (
  value?: string,
  type?: 'hash' | 'rawData' | 'address' | 'bytes',
  hasExplorer?: boolean,
  addressInfo?: AddressEx,
): ReactElement | null => {
  if (value == undefined) return null

  switch (type) {
    case 'hash':
    case 'address':
      const customAvatar = addressInfo?.logoUri

      return (
        <EthHashInfo
          address={value}
          name={addressInfo?.name}
          customAvatar={customAvatar}
          showAvatar={!!customAvatar}
          hasExplorer={hasExplorer}
          showCopyButton
        />
      )
    case 'rawData':
      let length = 0
      try {
        length = dataLength(value)
      } catch {
        // ignore
      }
      return (
        <Box
          data-testid="tx-data-row"
          sx={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <div>{length} bytes</div>
          <CopyButton text={value} />
        </Box>
      )
    case 'bytes':
      return <HexEncodedData highlightFirstBytes={false} limit={60} hexData={value} />
    default:
      return <Typography sx={{ wordBreak: 'break-all' }}>{value}</Typography>
  }
}
