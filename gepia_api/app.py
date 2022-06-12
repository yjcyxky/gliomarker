import requests
from flask_cors import CORS
from flask import Flask, request as flask_req
from gevent.pywsgi import WSGIServer

def get_boxplot(iflog='yes', qcutoff=0.01, fccutoff=1, gene=""):
    GEPIA='http://118.190.148.166/GEPIA2/'

    params={
        "color1": "#ff6666",
        "color2": "#7f7f7f",
        "dataset": ["GBM","LGG"],
        "fccutoff": fccutoff,
        "iflog": iflog,
        "ifstack": "yes",
        "is_sub": "false",
        "jittersize": "0.4",
        "matchdata": "NG",
        "qcutoff": qcutoff,
        "signature": [gene],
        "subtype": ""
    }

    def trans(s):
        if type(s) == str:
            s = [s.replace('#','%23')]
        if type(s) != list:
            return str(s)
        return ','.join(s)

    PHP = 'assets/PHP4/GET_boxplot_subtype_zf.php?'

    req = GEPIA + PHP
    for i in params:
        req += '&' + i + '=' + trans(params[i])

    print(req)
    ret = requests.get(req)

    if ret.status_code == 200:
        print(ret.text)
        response = ret.json()
        pdf = response['outdir']
        if pdf != 'fail':
            print(pdf)
            url = GEPIA + 'tmp/' + pdf + '#view=Fit'
            return url
        else:
            return 'No such gene.'
    else:
        return 'No such gene.'

def get_survival(methodoption='os', axisunit="month", ifhr="hr", gene=""):
    GEPIA='http://118.190.148.166/GEPIA2/'

    params={
        "highcol": "#ff0000",
        "lowcol": "#0000ff",
        "dataset": "GBM\nLGG",
        "methodoption": methodoption,
        "signature": gene,
        "groupcutoff1": 50,
        "groupcutoff2": 50,
        "axisunit": axisunit,
        "ifhr": ifhr,
        "ifconf": "conf",
        "is_sub": "false",
        "subtype": "",
        "signature_norm": ""
    }

    PHP = 'assets/PHP4/survival_zf.php?'

    req = GEPIA + PHP

    print(req, params)
    ret = requests.post(req, data=params)
    resp = ret.json()
    print(resp)
    pdf = resp['outdir']
    if pdf != 'fail':
        print(pdf)
        url = GEPIA + 'tmp/' + pdf + '#view=Fit'
        return url
    else:
        return 'No such gene.'


app = Flask(__name__)
CORS(app)

@app.route("/survival")
def survival():
    methodoption = flask_req.args.get('methodoption', 'os')
    axisunit = flask_req.args.get('axisunit', 'month')
    ifhr = flask_req.args.get('ifhr', 'hr')
    gene = flask_req.args.get('gene')
    if gene:
        return get_survival(methodoption=methodoption, axisunit=axisunit, ifhr=ifhr, gene=gene)
    else:
        return 'No such gene.'

@app.route("/boxplot")
def boxplot():
    iflog = flask_req.args.get('iflog', 'yes')
    qcutoff = flask_req.args.get('qcutoff', 0.01)
    fccutoff = flask_req.args.get('fccutoff', 1)
    gene = flask_req.args.get('gene')
    if gene:
        return get_boxplot(iflog=iflog, qcutoff=qcutoff, fccutoff=fccutoff, gene=gene)
    else:
        return 'No such gene.'

if __name__ == '__main__':
    print("Launching the gepia api server on 0.0.0.0:3000")
    http_server = WSGIServer(('', 3000), app)
    http_server.serve_forever()
