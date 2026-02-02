import { Box, Typography, Button, Accordion, AccordionSummary, AccordionDetails, TextField, Chip, Paper } from '@mui/material';
import { ExpandMore, Save, Send, RestoreFromTrash } from '@mui/icons-material';
import { useSnackbar } from 'notistack';

const templates = [
  { id: 'ALPHA', name: 'Notifikasi Alpha', content: 'Yth. Bapak/Ibu {wali},\n\nKami informasikan bahwa putra/putri Bapak/Ibu, *{nama}* kelas *{kelas}*, tidak hadir (Alpha) di sekolah pada tanggal *{tanggal}*.\n\nMohon konfirmasi kehadiran anak Bapak/Ibu.\n\nTerima kasih,\nSMAN 1 Kota Bandung\nTelp: (022) 1234567', vars: ['{wali}', '{nama}', '{kelas}', '{tanggal}'] },
  { id: 'TERLAMBAT', name: 'Notifikasi Terlambat', content: 'Yth. Bapak/Ibu {wali},\n\nKami informasikan bahwa *{nama}* kelas *{kelas}* hadir terlambat pada *{tanggal}* pukul *{waktu}*.\n\nMohon memastikan anak Bapak/Ibu tiba tepat waktu.\n\nSMAN 1 Kota Bandung', vars: ['{wali}', '{nama}', '{kelas}', '{tanggal}', '{waktu}'] },
  { id: 'SAKIT', name: 'Konfirmasi Sakit/Izin', content: 'Yth. Bapak/Ibu {wali},\n\nKami mengkonfirmasi bahwa *{nama}* kelas *{kelas}* tercatat *{status}* pada tanggal *{tanggal_mulai}* s/d *{tanggal_selesai}*.\n\nAlasan: {alasan}\n\nSemoga lekas sembuh.\n\nSMAN 1 Kota Bandung', vars: ['{wali}', '{nama}', '{kelas}', '{status}', '{tanggal_mulai}', '{tanggal_selesai}', '{alasan}'] },
  { id: 'IZIN_TENGAH_HARI', name: 'Izin Tengah Hari', content: 'Yth. Bapak/Ibu {wali},\n\n*{nama}* kelas *{kelas}* telah diberikan izin meninggalkan sekolah pada pukul *{waktu}* tanggal *{tanggal}*.\n\nAlasan: {alasan}\n\nSMAN 1 Kota Bandung', vars: ['{wali}', '{nama}', '{kelas}', '{waktu}', '{tanggal}', '{alasan}'] },
  { id: 'POIN_DITAMBAHKAN', name: 'Poin Pelanggaran Ditambahkan', content: 'Yth. Bapak/Ibu {wali},\n\n*{nama}* kelas *{kelas}* mendapatkan poin pelanggaran:\n\nKategori: *{kategori}*\nPoin: *{poin}*\nTotal Poin: *{total_poin}*\n\nTindakan: {tindakan}\n\nMohon bimbingan dari Bapak/Ibu.\n\nSMAN 1 Kota Bandung', vars: ['{wali}', '{nama}', '{kelas}', '{kategori}', '{poin}', '{total_poin}', '{tindakan}'] },
  { id: 'POIN_DISESUAIKAN', name: 'Poin Disesuaikan', content: 'Yth. Bapak/Ibu {wali},\n\nPoin disiplin *{nama}* kelas *{kelas}* telah disesuaikan:\n\nSebelum: *{poin_lama}*\nSesudah: *{poin_baru}*\nAlasan: {alasan}\n\nSMAN 1 Kota Bandung', vars: ['{wali}', '{nama}', '{kelas}', '{poin_lama}', '{poin_baru}', '{alasan}'] },
  { id: 'AMBANG_BATAS', name: 'Peringatan Ambang Batas', content: 'PENTING - Yth. Bapak/Ibu {wali},\n\n*{nama}* kelas *{kelas}* telah mencapai ambang batas poin disiplin level *{level}*.\n\nTotal Poin: *{total_poin}*\n\nTindak lanjut: {tindakan}\n\nMohon kehadiran Bapak/Ibu di sekolah.\n\nSMAN 1 Kota Bandung', vars: ['{wali}', '{nama}', '{kelas}', '{level}', '{total_poin}', '{tindakan}'] },
];

export default function MessageTemplatePage() {
  const { enqueueSnackbar } = useSnackbar();

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" fontWeight={700}>Template Pesan</Typography>
        <Button variant="outlined" startIcon={<RestoreFromTrash />} onClick={() => enqueueSnackbar('Template dikembalikan ke default', { variant: 'info' })}>Kembalikan ke Default</Button>
      </Box>

      {templates.map((t) => (
        <Accordion key={t.id} sx={{ mb: 1 }}>
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Chip label={t.id} size="small" color="primary" variant="outlined" />
              <Typography fontWeight={600}>{t.name}</Typography>
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <TextField fullWidth multiline rows={8} defaultValue={t.content} sx={{ mb: 2, fontFamily: 'monospace' }} />
            <Paper variant="outlined" sx={{ p: 1.5, mb: 2 }}>
              <Typography variant="caption" fontWeight={600}>Variabel tersedia:</Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mt: 0.5 }}>
                {t.vars.map((v) => <Chip key={v} label={v} size="small" variant="outlined" />)}
              </Box>
            </Paper>
            <Typography variant="caption" color="text.secondary" sx={{ mb: 2, display: 'block' }}>Karakter: ~{t.content.length} / 1000</Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button variant="contained" startIcon={<Save />} onClick={() => enqueueSnackbar('Template berhasil disimpan', { variant: 'success' })}>Simpan</Button>
              <Button variant="outlined" startIcon={<Send />} onClick={() => enqueueSnackbar('Pesan test dikirim ke admin', { variant: 'info' })}>Kirim Test</Button>
            </Box>
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
}
