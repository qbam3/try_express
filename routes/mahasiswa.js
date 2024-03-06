var express = require('express');
var router = express.Router();

const connection = require('../config/database');

const Model_Mahasiswa = require('../model/Model_Mahasiswa');

router.get('/', async function (req, res, next){
    let rows = await Model_Mahasiswa.getAll()
    res.render('mahasiswa/index',{
        data:rows
    });
});
router.get('/create',function (req, res, next){
    res.render('mahasiswa/create',{
        nama_mahasiswa: ''
    })
})
router.post('/store', function(req, res, next){
    try{
        let {nrp, nama_depan, nama_belakang, jenis_kelamin, agama, umur, tinggi_badan, gol_darah, alamat, hobi, email, no_telpon, asal_sekolah, tahun_lulus} = req.body;
        let Data = {
            nrp, 
            nama_depan, 
            nama_belakang, 
            jenis_kelamin, 
            agama, 
            umur, 
            tinggi_badan,
            gol_darah, 
            alamat, 
            hobi, 
            email, 
            no_telpon, 
            asal_sekolah, 
            tahun_lulus
        }
        connection.query('insert into mahasiswa set ?', Data, function(err, result) {
            if(err){
                console.log(err)
            }else{
                req.flash('success', 'Berhasil menyimpan data!');
            }
            res.redirect('/mahasiswa');
        })
    } catch {
    req. flash('error', 'Terjadi kesalahan pada fungsi')
    res.redirect('/mahasiswa');
    }
})
router.get('/edit/(:id)',function(req,res,next){
    let id = req.params.id;
    connection.query('select *from mahasiswa where id_mahasiswa = ' + id,function(err,rows){
        if(err){
            req.flash('error','Query gagal!');
        }else{
            res.render('mahasiswa/edit',{
                id:                 rows[0].id_mahasiswa,
                nrp:                rows[0].nrp,
                nama_depan:         rows[0].nama_depan,
                nama_belakang:      rows[0].nama_belakang,
                jenis_kelamin:      rows[0].jenis_kelamin,
                agama:              rows[0].agama,
                umur:               rows[0].umur,
                tinggi_badan:       rows[0].tinggi_badan,
                gol_darah:          rows[0].gol_darah,
                alamat:             rows[0].alamat,
                hobi:               rows[0].hobi,
                email:              rows[0].email,
                no_telpon:          rows[0].no_telpon,
                asal_sekolah:       rows[0].asal_sekolah,
                tahun_lulus:        rows[0].tahun_lulus
            })
        }
    })
})
router.post('/update/(:id)',function(req,res,next){
    try {
        let id = req.params.id;
        let {nrp, nama_depan, nama_belakang, jenis_kelamin, agama, umur, tinggi_badan, gol_darah, alamat, hobi, email, no_telpon, asal_sekolah, tahun_lulus} = req.body;
        let Data = {
            nrp, 
            nama_depan, 
            nama_belakang, 
            jenis_kelamin, 
            agama, 
            umur, 
            tinggi_badan,
            gol_darah, 
            alamat, 
            hobi, 
            email, 
            no_telpon, 
            asal_sekolah, 
            tahun_lulus
        }
        connection.query('update mahasiswa set ? where id_mahasiswa = ' + id, Data, function(err){
            if(err){
                console.log(err)
            }
            else{
                req.flash('success','sukses memperbarui data');
            }
            res.redirect('/mahasiswa');
        })
    }
    catch{
        req.flash('error','terjadi kesalahan pada fungsi');
        res.redirect('/mahasiswa');
    }
})
router.get('/delete/(:id)',function(req, res, next){
    let id = req.params.id;
    connection.query('delete from mahasiswa where id_mahasiswa = ' + id,function(err,rows){
        if(err){
            req.flash('error','Query gagal!');
        }else{
            req.flash('success','Berhasil menghapus data');
        }
        res.redirect('/mahasiswa')
    });
});

module.exports=router;